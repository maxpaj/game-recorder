import OBSWebSocket from "obs-websocket-js";

type Source = {
  sourceName: string;
  sourceType?: string | undefined;
  sourceSettings: {};
};

type SetVideoProperties = {};

type SetImageProperties = {
  file: string;
};

type SetSceneItemTransformBoundsScale =
    | "OBS_BOUNDS_STRETCH"
    | "OBS_BOUNDS_SCALE_INNER"
    | "OBS_BOUNDS_SCALE_OUTER"
    | "OBS_BOUNDS_SCALE_TO_WIDTH"
    | "OBS_BOUNDS_SCALE_TO_HEIGHT"
    | "OBS_BOUNDS_MAX_ONLY"
    | "OBS_BOUNDS_NONE";

type SetTextGDIPlusProperties = {
  source: string;
  render?: boolean;
  "bk-color"?: number;
  "bk-opacity"?: number;
  chatlog?: boolean;
  chatlog_lines?: number;
  color?: number;
  extents?: boolean;
  extents_cx?: number;
  extents_cy?: number;
  file?: string;
  read_from_file?: boolean;
  font?: { style?: string; size?: number; face?: string; flags?: number };
  vertical?: boolean;
  align?: string;
  valign?: string;
  text?: string;
  gradient?: boolean;
  gradient_color?: number;
  gradient_dir?: number;
  gradient_opacity?: number;
  outline?: boolean;
  outline_color?: number;
  outline_size?: number;
  outline_opacity?: number;
};

export type SetSceneItemProperties = {
  "scene-name"?: string;
  rotation?: number;
  item: { name?: string; id?: number };
  visible?: boolean;
  locked?: boolean;
  position: { y?: number; alignment?: number; x?: number };
  bounds: {
    y?: number;
    type?: SetSceneItemTransformBoundsScale;
    alignment?: number;
    x?: number;
  };
  scale: { x?: number; y?: number };
  height?: number;
  width?: number;
  sourceWidth?: number;
  sourceHeight?: number;
  crop: { bottom?: number; left?: number; right?: number; top?: number };
};

export type OBSConfig = {
  websocketServerPassword: string;
  websocketServerAddress: string;
  binFolder: string;
  log?: (str: string) => void;
}

export class OBSRecorder {
  private obsWebSocket: OBSWebSocket;
  private config: OBSConfig;

  constructor(config: OBSConfig) {
    this.obsWebSocket = new OBSWebSocket();
    this.config = config;
  }

  async obsInit() {
    await this.obsWebSocket.connect({
      address: this.config.websocketServerAddress,
      password: this.config.websocketServerPassword,
    });
  }

  async startRecord() {
    return this.obsWebSocket.send("StartRecording");
  }

  async stopRecord() {
    return this.obsWebSocket.send("StopRecording");
  }

  async setScene(sceneName: string) {
    return this.obsWebSocket.send("SetCurrentScene", {
      "scene-name": sceneName,
    });
  }

  async setTextProperties(
      textSourceName: string,
      properties: Omit<SetTextGDIPlusProperties, "source">
  ) {
    return this.obsWebSocket.send("SetTextGDIPlusProperties", {
      ...properties,
      source: textSourceName,
    });
  }

  async setImageProperties(
      imageSourceName: string,
      properties: SetImageProperties
  ) {
    return this.obsWebSocket.send("SetSourceSettings", {
      sourceName: imageSourceName,
      sourceSettings: properties,
    });
  }

  setSceneItemProperties(properties: SetSceneItemProperties) {
    return this.obsWebSocket.send("SetSceneItemProperties", properties);
  }

  async setVideoProperties(
      videoSourceName: string,
      properties: SetVideoProperties
  ) {
    return this.obsWebSocket.send("SetSourceSettings", {
      sourceName: videoSourceName,
      sourceSettings: properties,
    });
  }

  async getScenes() {
    return this.obsWebSocket.send("GetSceneList");
  }

  async getSourceSettings(sourceName: string) {
    return this.obsWebSocket.send("GetSourceSettings", {
      sourceName,
    });
  }

  startOBS() {
    const spawn = require("child_process").spawn;
    return spawn(`${this.config.binFolder}/obs64.exe`, [], {
      detached: true,
      stdio: ["ignore", "ignore", "ignore"],
      cwd: this.config.binFolder,
    });
  }
}

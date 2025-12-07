export type Message =
  | {
      type: 'init';
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      input: string;
    }
  | {
      type: 'set-input';
      input: string;
    };

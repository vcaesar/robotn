declare module "robot" {
  export interface Bitmap {
    width: number;
    height: number;
    imgBuf: any;
    byteWidth: number;
    bitsPixel: number;
    bytesPerPixel: number;
  }

  export function getVersion(): string;
  export function sleep(ms: number): void;
  export function MSleep(ms: number): void;
  //
  export function getPixelColor(x: number, y: number): string;
  export function getMouseColor(): string;
  export function getScreenSize(): { width: number; height: number };
  export function getScaleSize(): { width: number; height: number };
  export function saveCapture(
    x?: number,
    y?: number,
    w?: number,
    h?: number
  ): void;
  //
  export function keyTap(key: string, ...mod: string[]): string;
  export function keyToggle(key: string, ...mod: string[]): string;
  export function typeStr(str: string, args?: number): void;
  export function readAll(): string;
  export function writeAll(str: string): void;
  export function pasteStr(str: string): void;
  //
  export function moveMouse(x: number, y: number): void;
  export function moveSmooth(x: number, y: number): void;
  export function click(button?: string, double?: boolean): void;
  export function mouseToggle(down?: string, button?: boolean): void;
  export function dragMouse(x: number, y: number): void;
  export function scroll(x: number, y: number): void;
  export function getMousePos(): { x: number; y: number };
  //
  export function getText(path: string): string;
  export function captureScreen(
    x?: number,
    y?: number,
    w?: number,
    h?: number
  ): Bitmap;
  export function toStrBitmap(bit: Bitmap): string;
  export function bitmapFromStr(str: string): Bitmap;
  export function captureBitmapStr(
    x?: number,
    y?: number,
    w?: number,
    h?: number
  ): string;
  export function openBitmapStr(path: string): string;
  export function findBitmapStr(str: string): { x: number; y: number };
  export function saveBitmapStr(str: string, path: string): string;
  export function freeBitmap(bit: Bitmap): void;
  export function openBitmap(path: string, type?: number): Bitmap;
  export function saveBitmap(bitmap: Bitmap, path: string, type?: number): void;
  export function bitmapFromString(str: string): Bitmap;
  export function findBitmap(
    bitmap: Bitmap,
    sub_bitmap?: Bitmap,
    tol?: boolean
  ): { x: number; y: number };

  export function findColor(color: string): { x: number; y: number };
  export function findcolorCS(color: string): { x: number; y: number };
  export function findPic(path: string): { x: number; y: number };
  export function getImgSize(path: string): { w: number; h: number };
}

import {Flock} from "./flock";
import {Vector} from "./vector";

interface RendererCtor {
    new (flock: Flock, symbol: Vector[]): IRenderer;
}

export interface IRenderer {
    readonly width: number;
    readonly height: number;
    draw(flock: Flock): void;
    clear(): void;
}

export function getRenderer(ctor: RendererCtor, flock: Flock, symbol: Vector[]): IRenderer {
    return new ctor(flock, symbol);
}
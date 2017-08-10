interface RendererCtor {
    new (flock: Flock, symbol: Vector[]): IRenderer;
}

interface IRenderer {
    readonly width: number;
    readonly height: number;
    draw(flock: Flock): void;
    clear(): void;
}

function getRenderer(ctor: RendererCtor, flock: Flock, symbol: Vector[]): IRenderer {
    return new ctor(flock, symbol);
}
class Debug {
    static markings: Element[] = [];
    static hilight(loc: Vector, strength = 15, color = "red"): void {
        let circler = document.createElementNS(svgNS, "circle");
        circler.setAttribute("r", String(strength));
        circler.setAttribute("cx", String(loc.x));
        circler.setAttribute("cy", String(loc.y));
        circler.setAttribute("stroke", color);
        $vg.appendChild(circler);
        this.markings.push(circler);
    }

    static line(from: Vector, to: Vector, color = "blue"): void {
        let line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(from.x));
        line.setAttribute("y1", String(from.y));
        line.setAttribute("x2", String(to.x));
        line.setAttribute("y2", String(to.y));
        line.setAttribute("stroke", color);
        $vg.appendChild(line);
        this.markings.push(line);
    }

    static clear(): void {
        for(let el of this.markings){
            el.remove();
        }
        this.markings = [];
    }
}
"use client";

import React, { useEffect, useRef, useState } from "react";

interface ExplosionConfig {
    gravity: number;
    friction: number;
    imageSize: number;
    horizontalForce: number;
    verticalForce: number;
    rotationSpeed: number;
    resetDelay: number;
}

class Particle {
    // Propiedades de la clase con tipos definidos
    element: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    config: ExplosionConfig;

    constructor(element: HTMLImageElement, config: ExplosionConfig) {
        this.element = element;
        this.config = config;
        this.x = 0;
        this.y = 0;

        this.vx = (Math.random() - 0.5) * this.config.horizontalForce;
        this.vy = -this.config.verticalForce - Math.random() * 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * this.config.rotationSpeed;
    }

    update(): void {
        this.vy += this.config.gravity;
        this.vx *= this.config.friction;
        this.vy *= this.config.friction;
        this.rotationSpeed *= this.config.gravity;

        // Actualizar posición y rotación
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
}


const ExplosionContainer: React.FC = () => {


    const explosionContainerRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLElement | null>(null);
    const particlesRef = useRef<Particle[] | null>(null);


    const [explosionTriggered, setExplosionTriggered] = useState<boolean>(false);


    const config: ExplosionConfig = {
        gravity: 0.25,
        friction: 0.99,
        imageSize: 150,
        horizontalForce: 20,
        verticalForce: 15,
        rotationSpeed: 10,
        resetDelay: 500,
    };


    const imageParticleCount = 15;
    // Tipamos el array de rutas de imágenes como un array de strings
    const imagePaths: string[] = Array.from(
        { length: imageParticleCount },
        (_, i) => `/img/${i + 1}.jpg`
    );

    // Función para crear las partículas
    const createParticles = (): void => {
        if (!explosionContainerRef.current) return;

        explosionContainerRef.current.innerHTML = "";
        particlesRef.current = [];

        imagePaths.forEach((path) => {
            const particleElement = document.createElement("img");
            particleElement.src = path;
            particleElement.classList.add("explosion-particle-img");
            particleElement.style.width = `${config.imageSize}px`;
            explosionContainerRef.current?.appendChild(particleElement);
        });

        const particleElementsNodeList = explosionContainerRef.current.querySelectorAll<HTMLImageElement>(
            ".explosion-particle-img"
        );
        const particleElementsArray = Array.from(particleElementsNodeList);

        particlesRef.current = particleElementsArray.map(
            (element) => new Particle(element, config)
        );
    };

    // Función para iniciar la animación de explosión
    const explode = (): void => {
        if (explosionTriggered || !particlesRef) return; // Salir si ya está explotando o el ref no está listo
        setExplosionTriggered(true);

        createParticles();

        let animationId: number | null = null;
        let finished = false;

        const animate = (): void => {
            if (finished) return;

            particlesRef.current?.forEach((particle) => particle.update())

            if (
                explosionContainerRef.current &&
                particlesRef.current?.every(
                    (particle) =>
                        particle.y > (explosionContainerRef.current?.offsetHeight ?? 0) / 2
                )
            ) {
                // Detenemos la animación si animationId tiene un valor
                if (animationId !== null) {
                    cancelAnimationFrame(animationId);
                }
                finished = true;

                setTimeout(() => {
                    setExplosionTriggered(false);
                   
                }, config.resetDelay);
                return;
            }


            animationId = requestAnimationFrame(animate);
        };


        animate();
    };


    const checkFooterPosition = (): void => {
        if (!footerRef.current) return;

        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (
            !explosionTriggered &&
            footerRect.top <= viewportHeight - footerRect.height * 0.5
        ) {
            explode();
        }
    };


    useEffect(() => {

        imagePaths.forEach((path) => {
            const img = new Image();
            img.src = path;
        });

       
        footerRef.current = document.querySelector<HTMLElement>("footer");

     
        let checkTimeoutId: number | undefined;
        const handleScroll = (): void => {
            clearTimeout(checkTimeoutId);

            checkTimeoutId = window.setTimeout(checkFooterPosition, 10);
        };

        window.addEventListener("scroll", handleScroll);


        const initialCheckTimeoutId = window.setTimeout(checkFooterPosition, 500);


        const handleResize = (): void => {
            setExplosionTriggered(false);

        };
        window.addEventListener("resize", handleResize);



        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize); 
            clearTimeout(checkTimeoutId);
            clearTimeout(initialCheckTimeoutId);
        };
    }, [imagePaths]);

   
    return (
        <div
            className="explosion-container"
            ref={explosionContainerRef}
        >
        </div>
    );
};

export default ExplosionContainer;
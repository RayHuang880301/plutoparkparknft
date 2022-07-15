import React, { useRef, useEffect } from 'react'
import styles from './PlayCard.module.css'
import Image from 'next/image'
import ImageEffect1 from '../../assets/effect1.png'
import ImageEffect2 from '../../assets/effect2.png'
import ImageEffect3 from '../../assets/effect3.png'
import ImageEffect4 from '../../assets/effect4.png'

interface Props {
    onParentFunc?: Function;
}


export default function PlutoEffect(props : Props) {
    const {} = props;
    const root = useRef<HTMLDivElement>(null);
    const remove = (ele: Element, time: number) => {
        root.current?.append(ele);
        setTimeout(() => {
            ele.innerHTML = '';
            ele.remove();
        }, time);
    }
    function bounceInTop(name = 'c3', time = 700) {
        const ele = createElement(name, 'effect-item ef-bounce-in-top');
        const img = createElement(`${name}-img`, '', 'img');
        img.setAttribute('src', require(name));
        ele.append(img);
        if (Math.random() > 0.5) {
            // img.style.transform = 'rotate(90deg)';
            ele.style.bottom = `${(Math.random() * 7 + 1) / 10 * window.innerHeight}px`;
            ele.style.left = '-20%';
            ele.style.opacity = '0.2';
            setTimeout(() => {
                ele.style.left = '120%';
                ele.style.opacity = '1';
            }, 50);
        } else {
            ele.style.bottom = '115%';
            ele.style.left = `${(Math.random() * 7 + 1) / 10 * window.innerWidth}px`;
            ele.style.opacity = '0.2';
            setTimeout(() => {
                ele.style.bottom = '-20%';
                ele.style.opacity = '1';
            }, 50);
        }
        remove(ele, time);
    }
    function heartbeat(name = 'b8', time = 700) {
        const ele = createElement(name, 'effect-item ef-heartbeat');
        const img = createElement(`${name}-img`, '', 'img');
        img.setAttribute('src', require(name));
        ele.append(img);
        const { x, y } = getRandomPosition();
        ele.style.left = `${x}px`;
        ele.style.top = `${y}px`;

        remove(ele, time);
    }
    function waterfall(name = 'c1', time = 1500) {
        let offset = 0;
        const num = 6;
        const offsetBase = Math.round(window.innerWidth / num);
        new Array(num).fill(0).forEach((_, i) => {
            const ele = createElement(name, 'effect-item ef-waterfall top-bottom');
            ele.style.transform = `translateX(${offset}px)`;
            const box = createElement(name, 'box');
            setTimeout(() => {
                const img = createElement(`${name}-img-${i}`, '', 'img');
                img.setAttribute('src', require(name));
                box.append(img);
                ele.append(box);

                remove(ele, time);
            }, (Math.random() * 30) * 3 * i);
            offset += offsetBase;
        });
    }
    function rotateRandom(name = 'b2', time = 500) {
        const ele = createElement(name, 'effect-item ef-rotate-item');
        const img = createElement(`${name}-img`, '', 'img');
        img.setAttribute('src', require(name));
        ele.append(img);
        const { x, y } = getRandomPosition();
        ele.style.left = `${x}px`;
        ele.style.top = `${y}px`;

        remove(ele, time);
    }
    function rotateRandomBatch(name = 'b3', time = 500) {
        new Array(Math.round((Math.random() * 5) + 3)).fill(0).forEach(() => {
            rotateRandom(name, time);
        });
    }
    const fadeInCenterBig = (name = 'free-b6', time = 500) => {
        const ele = createElement(name, 'effect-item ef-fade-big');
        const img = createElement(`${name}-img`, '', 'img');
        img.setAttribute('src', require(name));
        ele.append(img);

        remove(ele, time);
    }

    function animateFadeIn(name: string, time = 1000) {
        const ele = createElement(name, 'effect-item ef-fade-in');
        const img = createElement(`${name}-img`, '', 'img');
        img.setAttribute('src', require(name));
        ele.append(img);
        const { x, y } = getRandomPosition(200);
        ele.style.left = `${x}px`;
        ele.style.top = `${y}px`;

        remove(ele, time);
    }
    function animateFadeInBatch(name = 'free-b5', time = 1000) {
        new Array(Math.round((Math.random() * 5) + 3)).fill(0).forEach(() => {
            animateFadeIn(name, time);
        });
    }

    useEffect(() => {
        // clerup();
        // props.onParentFunc(animateHandler);
        [ImageEffect1.src, ImageEffect2.src, ImageEffect3.src, ImageEffect4.src].forEach((img) => {
            preloadImage(img);
        });

        setInterval(() => {
            animateFadeInBatch('Work');
        }, 2000);
    }, []);

    return (
        <div ref={root} id="pluto-effect" className="pluto-effect only-nft"></div>
    )
}

function require(name: string) {
    switch (name) {
        case 'Study':
            return ImageEffect1.src;
        case 'Work':
            return ImageEffect2.src;
        case 'Love':
            return ImageEffect3.src;
        case 'Health':
        default:
            return ImageEffect4.src;
    }
};

function preloadImage(url: string) {
    // const img = Image({
    //     src: url
    // });
}

function createElement(name: string, className: string, tag = 'div') {
    const ele = document.createElement(tag);
    ele.setAttribute('class', `${className}`);
    return ele;
}

function getRandomPosition(edge = 200) {
    const x = Math.random() * (window.innerWidth - edge);
    const y = Math.random() * (window.innerHeight - edge);
    return { x, y };
}
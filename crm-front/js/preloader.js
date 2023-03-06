import { svgPreloader } from "./svg.js";

// прелоадер
export const preloader = () => {
    const preloaderBlock = document.createElement('div');
    const preloaderElem = document.createElement('span');

    preloaderBlock.classList.add('loader');

    preloaderElem.id = 'preloader';
    
    preloaderElem.innerHTML = svgPreloader;

    preloaderBlock.append(preloaderElem);

    return preloaderBlock;
};
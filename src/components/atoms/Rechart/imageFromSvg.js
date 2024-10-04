import reactHtmlParser, { convertNodeToElement } from "react-html-parser";

/**
 * Converts an svg string to a png image and returns a URI to it
 * @param svgString
 * @param renderWidth
 * @param renderHeight
 * @return {Promise<string>}
 */
export async function svgToDataURI(svgString, renderWidth, renderHeight) {
  if (!svgString || !renderWidth || !renderHeight) {
    throw new Error("Missing arguments");
  }

  const canvas = document.createElement("canvas");

  canvas.width = renderWidth;
  canvas.height = renderHeight;
  const ctx = canvas.getContext("2d");

  const img = new global.Image();

  return new Promise((resolve, reject) => {
    img.onload = function load() {
      /* png보다 jpg가 더 낫긴하지만, 해상도가 떨어져서 보이는건 여전함, 이유 모르겠음
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, img.width, img.height);
            ctx.drawImage(img, 0, 0);
            const url = canvas.toDataURL('image/jpeg', 1.0);
            */

      ctx.drawImage(img, 0, 0);
      const url = canvas.toDataURL("image/png", 1.0);

      resolve(url);
    };

    img.onerror = reject;

    img.src = encodeSvgString(svgString);
  });
}

import * as ReactDom from "react-dom/server";

export const htmlSvgToPdfSvgSync = (children) => {
  // Fix: replaceAll 메서드는 현재 사용하는 docker image의 Node version과 호환되지 않으므로
  // 아래와 같이 replace 함수로 수정.
  // const svgString = ReactDom.renderToStaticMarkup(children).replaceAll(
  const svgString = ReactDom.renderToStaticMarkup(children).replace(
    "/px/g",
    "pt"
  );
  const [component] = reactHtmlParser(svgString, {
    transform: convertToPdfSvg,
  });
  return component;
};

/*
 * Todo: This is almost ready for charts react-pdf/render have some issues with element positions
 *  We'll give this a go in the future */
export const htmlSvgToPdfSvg = async (children) => {
  const ReactDom = await import("react-dom/server");

  const svgString = ReactDom.renderToStaticMarkup(children).replaceAll(
    "px",
    "pt"
  );
  // console.log("before: ", svgString)
  const [component] = reactHtmlParser(svgString, {
    transform: convertToPdfSvg,
  });
  // console.log("after")

  // console.log("component: ", component)
  return component;
};

/**
 * Adds cache to a function
 * @template T
 * @param {function(...[*]): Promise<T>} func
 * @param {number} [cacheArgIndex=0]
 * @return {function(...[*]): Promise<T>}
 */
export function withCache(func, cacheArgIndex = 0) {
  return (...args) => {
    const key = args[cacheArgIndex];
    if (weakCache.has(key)) {
      return weakCache.get(key);
    } else {
      const promise = Promise.resolve(func(...args));
      weakCache.set(key, promise);

      return promise;
    }
  };
}

function encodeSvgString(svg) {
  const decoded = unescape(encodeURIComponent(svg));
  const b64String = global.btoa(decoded);
  const imgSource = `data:image/svg+xml;base64,${b64String}`;

  return imgSource;
}

function convertToPdfSvg(node, index) {
  if (node.type === "text") {
    return node.data;
  }

  node.name = node.name?.toUpperCase();
  return convertNodeToElement(node, index, convertToPdfSvg);
}

/**
 * @type {WeakMap<object, Promise>}
 */
const weakCache = new WeakMap();

/*
  // Class vs function Component (https://chanhuiseok.github.io/posts/react-4/)
  // React State (https://chanhuiseok.github.io/posts/react-6/)

  [function]


  [Class]
  class App extends React.Component {
  state = {
      isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? 'Loading !!' : 'We are READY!!!!!!'}</div>;
  }
}

*/

/*
  Promise는 다음 중 하나의 상태를 가집니다.
  - 대기(pending): 이행하거나 거부되지 않은 초기 상태.
  - 이행(fulfilled): 연산이 성공적으로 완료됨.
  - 거부(rejected): 연산이 실패함.

  function f = new Promise(
      // 실행 함수는 프로미스를 이행(resolve)하거나, 거부(reject)할 수 있음
      function(resolve, reject) {
          resolve();  // 이행에 성공한 경우,
          reject();   // 실패한 경우,
      }
  );

  f.then(function()) {
    // resolve 됐을 경우, callback
  };
  f.catch(function()) {
    // reject 됐을 경우, callback
  };
*/

/*
async function 함수명() {
  await 비동기_처리_메서드_명();  // promise 객체를 반환하는 함수
}
*/

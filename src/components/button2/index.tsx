import React from 'react';
import ReactDom from 'react-dom';

import './css';

function Button2() {
  return (
    <div className="button2">
      <span>button2</span>
      <span className="button2-bg" />
    </div>
  );
}

// 这里为了可以让组件在js中直接调用暴露一个create方法
function ButtonHoc(Component: React.ComponentType) {
  Component.create = (containerId: string, props: any) => {
    ReactDom.render(
      <Component {...props} />,
      document.querySelector(containerId),
    );
  };
  return Component;
}

export default ButtonHoc(Button2);

import React from 'react';
import ReactDom from 'react-dom';

import './css';

function Button1() {
  return (
    <div className="button1">
      <span>button1</span>
      <span className="button1-bg" />
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

export default ButtonHoc(Button1);

import { cloneElement, ReactElement } from 'react';

interface IProps {
  children: ReactElement<any>;
  event?: string;
  properties?: {
    page_name?: string;
    button_name?: string;
    [key: string]: any;
  };
}

function TrackClicked({ children, event, properties }: IProps) {
  return event
    ? cloneElement(children, {
        ...children.props,
        onClick: (...props: any) => {
          children.props?.onClick?.(...props);
          // 按钮埋点，自定义事件
          // buttonClickedTracking(event, properties);
        },
      })
    : children;
}

export default TrackClicked;

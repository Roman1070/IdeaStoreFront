import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import IdeaCard from "./IdeaCard";

const ReactGridLayout = WidthProvider(RGL);

export default class NoDraggingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    items: 20,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () {},
  };

  constructor(props) {
    super(props);

    const layout = this.generateDOM();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function (i) {
      return <IdeaCard key={i} image={`images/image${i + 1}.jpg`} />;
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

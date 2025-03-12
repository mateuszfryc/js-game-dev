'use strict';

Engine.Layers = {
  background: [],
  backstage: [],
  stage: [],
  front: [],
  UI: [],

  addToLayer: function (layer, entity) {
    this[layer].push(entity);
  },

  pushAllLayersToStage: function (stage) {
    this.background.forEach((i) => stage.addChild(i));
    this.backstage.forEach((i) => stage.addChild(i));
    this.stage.forEach((i) => stage.addChild(i));
    this.front.forEach((i) => stage.addChild(i));
    this.UI.forEach((i) => stage.addChild(i));
  },
};

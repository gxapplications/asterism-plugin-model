'use strict'

import { AdditionalItem, ItemFactoryBuilder } from 'asterism-plugin-library'

import AnimatedFrameItem from './animated_frame/item'
import AnimatedFrameSettingPanel from './animated_frame/setting-panel'

const builder = new ItemFactoryBuilder()
.newItemType('animated_frame', AdditionalItem.categories.SCREENING)
  .withDescription('Simple animated frame', 'Screening from train through tunnels...')
  .settingPanelWithHeader('Animated frame setting', 'image') // optional override, but always before *Instance*() calls...
  .newInstanceFromInitialSetting(3, 2, AnimatedFrameSettingPanel)
  .existingInstance(AnimatedFrameItem, AnimatedFrameSettingPanel)
  .acceptDimensions([
    { w: 1, h: 2 },
    { w: 1, h: 3 },
    { w: 2, h: 3 },
    { w: 2, h: 4 },
    { w: 2, h: 5 },
    { w: 2, h: 6 },
    { w: 3, h: 4 },
    { w: 3, h: 5 },
    { w: 3, h: 6 },
    { w: 3, h: 7 }
  ])
  .build()

class TemplateItemFactory extends builder.build() {
  // more custom functions here if needed...
}

export default TemplateItemFactory

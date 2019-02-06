'use strict'

import { AdditionalItem, ItemFactoryBuilder } from 'asterism-plugin-library'

import AnimatedFrameItem from './animated_frame/item'
import AnimatedFrameSettingPanel from './animated_frame/setting-panel'

const builder = new ItemFactoryBuilder()
.newItemType('animated_frame', AdditionalItem.categories.SCREENING)
  .withDescription('Simple animated frame', 'Screening from train through tunnels...')
  .settingPanelWithHeader('Animated frame setting', 'image') // optional override, but always before *Instance*() calls...
  .newInstanceWithoutInitialSetting(AnimatedFrameItem, 2, 2, AnimatedFrameSettingPanel)
  .existingInstance(AnimatedFrameItem, AnimatedFrameSettingPanel)
  .acceptDimensions([
    { w: 1, h: 2 },
    { w: 2, h: 2 }
  ])
  .build()

class TemplateItemFactory extends builder.build() {
  // more custom functions here if needed...
}

export default TemplateItemFactory

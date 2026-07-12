import React from 'react';
import { UI_MESSAGES } from '../lib/messages';

export default function FirstUseNotice(): JSX.Element {
  return <aside role="note">{UI_MESSAGES.firstUse}</aside>;
}

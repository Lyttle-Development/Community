import * as markdownComponents from './imports';
import { JSX } from 'react';
import {
  SettingCardChange,
  SettingCardSubItem,
} from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';

export enum SettingCardSubItems {
  Input = 'Input',
  Select = 'Select',
  Textarea = 'Textarea',
}

export interface SettingCardComponentProps {
  item: SettingCardSubItem;
  changes: Changes;
  change: SettingCardChange;
}

export type AvailableSettingCardComponentsObject = {
  [key in SettingCardSubItems]: (
    props: SettingCardComponentProps,
  ) => JSX.Element;
};

export const SettingCardComponents =
  markdownComponents as AvailableSettingCardComponentsObject;

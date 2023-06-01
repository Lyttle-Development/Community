import { SettingCardInputItem } from '@lyttledev-dashboard/components/setting-card/components/input';
import {
  SettingCard,
  SettingCardSubItem,
} from '@lyttledev-dashboard/components/setting-card/setting-card';
import { SettingCardTextareaItem } from '@lyttledev-dashboard/components/setting-card/components/textarea';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';
import { SettingCardSelectItem } from '@lyttledev-dashboard/components/setting-card/components/select';

export class CreateSettingCard {
  private settings: SettingCard;

  constructor() {
    this.settings = {
      id: null,
      title: '',
      description: '',
    };
  }

  id(id: string | null) {
    this.settings.id = id;
    return this;
  }

  title(title: string) {
    this.settings.title = title;
    return this;
  }

  description(description: string) {
    this.settings.description = description;
    return this;
  }

  enabled(state: boolean, key: string) {
    this.settings.enabled = { state, key };
    return this;
  }

  addSubItem(addSubItem = (subItem: CreateSettingCardSubItem) => subItem) {
    const card = addSubItem(new CreateSettingCardSubItem(this.settings));
    this.settings = card.settings;
    return this;
  }

  build() {
    return this.settings;
  }
}

export class CreateSettingCardSubItem {
  constructor(readonly settings: SettingCard) {
    this.settings = settings;
  }

  input(addInput = (input: CreateSettingCardInputItem) => input) {
    const card = addInput(new CreateSettingCardInputItem());
    this.addSubItem(card.subItem);
    return this;
  }

  textarea(
    addTextarea = (textarea: CreateSettingCardTextareaItem) => textarea,
  ) {
    const card = addTextarea(new CreateSettingCardTextareaItem());
    this.addSubItem(card.subItem);
    return this;
  }

  select(addSelect = (select: CreateSettingCardSelectItem) => select) {
    const card = addSelect(new CreateSettingCardSelectItem());
    this.addSubItem(card.subItem);
    return this;
  }

  private addSubItem(subItem: SettingCardSubItem) {
    if (!this.settings.subItems) {
      this.settings.subItems = [];
    }
    this.settings.subItems.push(subItem);
  }
}

export class CreateSettingCardInputItem {
  readonly subItem: SettingCardInputItem;

  constructor() {
    this.subItem = {
      key: '',
      value: '',
      variables: [],
      type: SettingCardSubItems.Input,
    };
  }

  key(key: string) {
    this.subItem.key = key;
    return this;
  }

  value(value: string) {
    this.subItem.value = value;
    return this;
  }

  variables(variables: { variable: string; description: string }[]) {
    this.subItem.variables = variables;
    return this;
  }
}

export class CreateSettingCardTextareaItem {
  readonly subItem: SettingCardTextareaItem;

  constructor() {
    this.subItem = {
      key: '',
      value: '',
      variables: [],
      type: SettingCardSubItems.Textarea,
    };
  }

  key(key: string) {
    this.subItem.key = key;
    return this;
  }

  value(value: string) {
    this.subItem.value = value;
    return this;
  }

  variables(variables: { variable: string; description: string }[]) {
    this.subItem.variables = variables;
    return this;
  }
}

export class CreateSettingCardSelectItem {
  readonly subItem: SettingCardSelectItem;

  constructor() {
    this.subItem = {
      key: '',
      value: '',
      title: '',
      options: [],
      type: SettingCardSubItems.Select,
      single: true,
    };
  }

  key(key: string) {
    this.subItem.key = key;
    return this;
  }

  value(value: string) {
    this.subItem.value = value;
    return this;
  }

  title(title: string) {
    this.subItem.title = title;
    return this;
  }

  options(options: { key: string; value: string }[]) {
    this.subItem.options = options;
    return this;
  }

  single(single: boolean) {
    this.subItem.single = single;
    return this;
  }
}

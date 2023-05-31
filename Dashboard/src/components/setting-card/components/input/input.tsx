import { SettingCardChange } from '@lyttledev-dashboard/components/setting-card';
import { Changes } from '@lyttledev-dashboard/contexts/App.context';
import { SettingCardSubItems } from '@lyttledev-dashboard/components/setting-card/components';

export interface SettingCardInputItem {
  type: SettingCardSubItems.Input;
  key: string;
  value: string;
  variables: { variable: string; description: string }[];
  defaultKey: string;
  placeholder: string;
}

export interface SettingCardInputProps {
  item: SettingCardInputItem;
  changes: Changes;
  change: SettingCardChange;
}

export function Input({ item, changes, change }: SettingCardInputProps) {
  const { key, value, variables, defaultKey, placeholder } = item;
  return (
    <section>
      {variables && variables.length > 0 && (
        <ul>
          {variables.map((variable, i) => (
            <li key={i}>
              <span>{variable.variable}</span>
              <span>{variable.description}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

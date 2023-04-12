// export
export const NUMBER_TYPES: NumberStyles = {
  superscript: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'],
  subscript: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
  caps: ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'],
  serif: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'],
  'round-full': ['⓿', '➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒'],
  'round-empty': ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'],
  landing: ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'],
  lite: ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'],
};

export enum NumberStyle {
  'superscript' = 'superscript',
  'subscript' = 'subscript',
  'caps' = 'caps',
  'serif' = 'serif',
  'round-full' = 'round-full',
  'round-empty' = 'round-empty',
  'landing' = 'landing',
  'lite' = 'lite',
}

export type NumberStyles = {
  [key in NumberStyle]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
};

import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { BlockType } from './Elements';

export type HeadingLevel = 1 | 2 | 3;

export type Editor = BaseEditor & ReactEditor;

export type Text = {
  text: string;
};

export type FormattedText = Text & {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  code?: boolean;
  spoiler?: boolean;
};

export type LinkElement = {
  type: BlockType.Link;
  href: string;
  children: FormattedText[];
};
export type SpoilerElement = {
  type: 'spoiler';
  alert?: string;
  children: FormattedText[];
};
export type MentionElement = {
  type: BlockType.Mention;
  id: string;
  highlight: boolean;
  name: string;
  children: Text[];
};
export type EmoticonElement = {
  type: BlockType.Emoticon;
  key: string;
  shortcode: string;
  children: Text[];
};

export type ParagraphElement = {
  type: BlockType.Paragraph;
  children: FormattedText[];
};
export type HeadingElement = {
  type: BlockType.Heading;
  level: HeadingLevel;
  children: FormattedText[];
};
export type CodeLineElement = {
  type: BlockType.CodeLine;
  children: Text[];
};
export type CodeBlockElement = {
  type: BlockType.CodeBlock;
  children: CodeLineElement[];
};
export type QuoteLineElement = {
  type: BlockType.QuoteLine;
  children: FormattedText[];
};
export type BlockQuoteElement = {
  type: BlockType.BlockQuote;
  children: QuoteLineElement[];
};
export type ListItemElement = {
  type: BlockType.ListItem;
  children: FormattedText[];
};
export type OrderedListElement = {
  type: BlockType.OrderedList;
  children: ListItemElement[];
};
export type UnorderedListElement = {
  type: BlockType.UnorderedList;
  children: ListItemElement[];
};

export type CustomElement =
  | LinkElement
  // | SpoilerElement
  | MentionElement
  | EmoticonElement
  | ParagraphElement
  | HeadingElement
  | CodeLineElement
  | CodeBlockElement
  | QuoteLineElement
  | BlockQuoteElement
  | ListItemElement
  | OrderedListElement
  | UnorderedListElement;

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: FormattedText & Text;
  }
}

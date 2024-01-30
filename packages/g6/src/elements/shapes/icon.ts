import { DisplayObjectConfig, Image as GImage, Text as GText, Group, ImageStyleProps, TextStyleProps } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseShapeStyleProps } from './base-shape';
import { BaseShape } from './base-shape';

export type IconStyleProps = BaseShapeStyleProps & Partial<TextStyleProps> & Partial<ImageStyleProps>;

export type IconOptions = DisplayObjectConfig<IconStyleProps>;

export class Icon extends BaseShape<IconStyleProps> {
  static defaultStyleProps: Partial<IconStyleProps> = {};

  constructor(options: IconOptions) {
    super(deepMix({}, { style: Icon.defaultStyleProps }, options));
  }

  private isGImage() {
    return !!this.getAttribute('src');
  }

  protected getIconStyle(attributes: IconStyleProps = this.attributes): IconStyleProps {
    const style = this.getGraphicStyle(attributes);

    if (this.isGImage()) {
      return {
        ...style,
        anchor: [0.5, 0.5],
      };
    }
    return {
      ...style,
      textBaseline: 'middle',
      textAlign: 'center',
    };
  }

  public render(attributes = this.attributes, container: Group = this): void {
    // @ts-ignore
    this.upsert('icon', this.isGImage() ? GImage : GText, this.getIconStyle(attributes), container);
  }

  connectedCallback() {
    // @ts-ignore
    this.upsert('icon', this.isGImage() ? GImage : GText, this.getIconStyle(this.attributes), this);
  }
}
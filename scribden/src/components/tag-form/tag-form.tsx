import { Component, Prop, h } from '@stencil/core';
import { ItemType } from '../../interfaces/item';
import { TagService } from '../../services/tags';

@Component({
  tag: 'tag-form'
})
export class TagForm {
  @Prop() item: ItemType;

  render() {
    return [
      <quick-add
        label="New Tag"
        add={(value: string) => TagService.addTag(this.item.id, value)}
      ></quick-add>,
      <ion-item-group>
        {TagService.getTags(this.item.id).map((tag) => (
          <ion-chip>
            <ion-label>{tag}</ion-label>
            <ion-icon
              name="close"
              onClick={() => TagService.deleteTag(this.item.id, tag)}
            ></ion-icon>
          </ion-chip>
        ))}
      </ion-item-group>
    ];
  }
}

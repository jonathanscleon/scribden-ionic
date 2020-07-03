import { Component, Prop, h } from '@stencil/core';
import { TagService } from '../tag-service';

@Component({
  tag: 'tag-form'
})
export class TagForm {
  @Prop() itemId: string;

  render() {
    const list = TagService.getList(this.itemId);
    return [
      <quick-add
        label="New Tag"
        add={(value: string) => TagService.addTag(this.itemId, list.id, value)}
      ></quick-add>,
      <ion-item-group>
        {list.Tags && list.Tags.map((tag) => (
          <ion-chip>
            <ion-label>{tag.name}</ion-label>
            <ion-icon
              name="close"
              onClick={() => TagService.deleteTag(this.itemId, tag)}
            ></ion-icon>
          </ion-chip>
        ))}
      </ion-item-group>
    ];
  }
}

import { actionSheetController } from '@ionic/core';
import { ItemService } from '../item-service';
import { ChecklistService } from '../../checklist/checklist-service';
import { NoteService } from '../../note/note-service';
import { ReminderService } from '../../reminder/reminder-service';
import { TagService } from '../../tag/tag-service';
import { ItemType } from '../item-interface';

export async function presentBehaviorActionSheet(item: ItemType) {
  const navigate = (page: string) => {
    document.querySelector('ion-router').componentOnReady().then(router => {
      router.push(`/${page}/${item.id}`);
    });
  };

  const availableBehaviors = [];

  const behaviors = {
    'Checklists': {
      text: 'Checklist',
      icon: 'checkbox',
      handler: () => {
        ChecklistService.createList(item.id);
        navigate('checklist');
      }
    },
    'Notes': {
      text: 'Note',
      icon: 'document-text',
      handler: () => {
        NoteService.createNote(item.id);
        navigate('note');
      }
    },
    'Reminders': {
      text: 'Reminder',
      icon: 'alarm',
      handler: () => {
        ReminderService.createReminder(item.id);
        navigate('reminder');
      }
    },
    'TagLists': {
      text: 'Tags',
      icon: 'pricetag',
      handler: () => {
        TagService.createList(item.id);
        navigate('tags');
      }
    },
    // @TODO
    /*
    'share': {
      text: 'Share',
      icon: 'share',
      handler: () => {
        
      }
    },
    'folder': {
      text: 'Folder',
      icon: 'folder',
      handler: () => {
        
      }
    },
    'comment': {
      text: 'Comment Thread',
      icon: 'chatbox',
      handler: () => {
        
      }
    },*/
    'delete': {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        ItemService.deleteItem(item.id);
      }
    },
    'cancel': {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }
  };

  // if the behavior has been added, do not allow re-adding it
  for (const prop in item) {
    if (item[prop] && behaviors[prop]) {
      delete behaviors[prop];
    }
  }

  // show all behavior options that haven't been added yet
  for (const behavior in behaviors) {
    availableBehaviors.push(behaviors[behavior]);
  }

  const actionSheet = await actionSheetController.create({
    header: 'Attach Behavior',
    buttons: availableBehaviors
  });

  await actionSheet.present();
};

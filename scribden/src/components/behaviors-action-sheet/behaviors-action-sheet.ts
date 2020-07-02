import { actionSheetController } from '@ionic/core';
import { ItemService } from '../../services/item';
import { ChecklistService } from '../../services/checklist';
import { NoteService } from '../../services/note';
import { ReminderService } from '../../services/reminder';
import { TagService } from '../../services/tag';
import { ItemType } from '../../interfaces/item';

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

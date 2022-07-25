# NgShortcuts

Angular module that provides an easy way to handle user shortcuts in your components with a
declarative decorator-based API.

## Getting started

Install the package from `npm` 
```
npm install --save ng-shortcuts
```

and import the `NgShortcutsModule` in your application module.

```typescript
import { NgShortcutsModule } from 'ng-shortcuts';

@NgModule({
  declarations: [...],
  imports: [
    BrowserModule,
    NgShortcutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

Make your component to start listening user shortcuts by decorating it with the `UseDelegateShortcuts` decorator.  
The `UseDelegateShortcuts` expects a collection of `DelegateShortcut`, which represents the shortcuts to listen.

A `DelegateShortcut` has two properties:
- `keys`: a collection of strings that represents the shortcut keys.
- `handle`: the function to invoke when the shortcut it received.
The `handle` function receives the component instance.

```typescript
@UseDelegateShortcuts<AppComponent>([
  {
    keys: ['p'],
    handle: (component) => component.sayHello()
  },
  {
    keys: ['shift', 'p'],
    handle: (component) => component.sayGoodbye()
  }
])
@Component({ ... })
export class AppComponent {

  public sayHello = () => {
    console.info('Hello 🙋‍♂️');
  }

  public sayGoodbye = () => {
    console.info('Goodbye 🙋‍♂️');
  }
}
```

> Besides alphanumeric keycodes, modifier keys are supported. Check the [full list of modifier keys](https://www.w3.org/TR/DOM-Level-3-Events-key/#keys-modifier).

### Implementing a listener

For more complex scenarios, *ng-shortcuts* exposes the `UseShortcuts` decorator, which expects a listener class.  
Create a class that inherits the `ShortcutListener` base class, specifying the component type and an enum type. The enum will list any possible shortcut value.

```typescript
enum AppEvent {
  Hello,
  Goodbye
}

export class AppListener extends ShortcutListener<AppComponent, AppEvent> {

  protected shortcuts: Shortcut<AppEvent>[] = [
    { keys: ['p'], event: AppEvent.Hello },
    { keys: ['shift', 'p'], event: AppEvent.Goodbye }
  ];

  protected handle(component: AppComponent, event: AppEvent): void {
    switch (event) {
      case AppEvent.Hello:
        component.sayHello();
        break;
    
      case AppEvent.Goodbye:
        component.sayGoodbye();
        break;
    }
  }
}
```
The listener has to declare a `shortcuts` collection. Each shortcut element will link the shortcuts keys with an event value.  
The `handle` function will be invoked whenever a declared shortcut is triggered by the user.

```typescript
@UseShortcuts<AppComponent>(AppListener)
@Component({ ... })
export class AppComponent {

  public sayHello = () => {
    console.info('Hello 🙋‍♂️');
  }

  public sayGoodbye = () => {
    console.info('Goodbye 🙋‍♂️');
  }
}
```

### Handle subscriptions

By default, all shortcuts listeners are unsubscribed when the component is unmounted.  
To keep the listener subscribed after the component is unmounted, set the `unsubscribe` option to `false`.

```typescript
@UseShortcuts<AppComponent>(AppListener, { unsubscribe: false })
@UseDelegateShortcuts<AppComponent>([ ... ], { unsubscribe: false })
```

## Muted components

Since the shortcut listener will be listening to events as long as the component is mounted,
rendering another component won't prevents the shortcuts to trigger.

Decorating a component with the `MuteShortcuts` decorator will disable (mute) **all** shortcuts listeners
while this component is displayed.

```typescript
@MuteShortcuts
@Component({ ... })
export class MutedComponent { }
```

## Muted elements

Elements can be excluded from triggering shortcuts events. No shortcut will be triggered when the application focus is on these elements.
To exclude an element from shortcuts, decorate the element with the `ExcludeFromShortcuts` decorator.

```typescript
@UseShortcuts<AppComponent>(AppListener)
@Component({
  template: `<input #myelement type="text">`
})
export class AppComponent {
  @ExcludeFromShortcuts()
  @ViewChild('myelement')
  excluded?: ElementRef<HTMLInputElement>;

  public sayHello = () => {
    console.info('Hello 🙋‍♂️');
  }

  public sayGoodbye = () => {
    console.info('Goodbye 🙋‍♂️');
  }
}
```
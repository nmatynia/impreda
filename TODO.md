# TODO

## Components

- Display errors on fields
- transition on Box
- Nav underline current category that the user is on
- make the ItemHeader menus hoverable instead of clickable
- make the Navbar sticky
- consider making the Navbar transparent (redesign)
- change the space screenWithoutHeader so it is pixel perfect both on mobile and desktop
- after rethinking and reimplementing the Navbar have a look at item page at the right section and its spacing
- item container - if the last item is alone in the row it's alignment is slightly off
- multiselect count is broken after clicking "ESC" on opened menu
- make item creation go back to default values set from refs
- item reservation in cart

## Pages

## Misc

- custom scroll (e.g. cart)

## Low Priority

- Toasts on adding/deleting/editing users/items etc.
- Color picker and adding new colors to DB.
- Color display in Select
- searchBar enhancement - maybe fuzzy search?
- give size chart functionality
- custom cursor (e.g. when hovering on out of stock items)
- display more data in user preview in admin panel
- perhaps make the previewed image smaller (item-creator)
- isLoading state in UserDetailsDialog in admin view
- user list dialog, throws one trpc error after deleting a user (there is one request to fetch user details but the user is no longer existing)
- additional modal, dropdown to confirm deletion of item/user
- enhance Loader - /item-creator
- enhance handeling the states between forms in item-creator, right now it looks hacky and ugly
- edition of the colors doesnt update existing colors, also it resets quantity (could be solved better)
- item availibility form - change default value state behaviour

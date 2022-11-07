
# Tutorial for application development

In this section, we will show you how to  develop a simple application on the IBAX Network.

  - [The Goal](#the-goal)
  - [Part 1: The Environment](#part-1-the-environment)
  - [Part 2: Contract](#part-2-contract)
    - [Creator account](#creator-account)
    - [New application](#new-application)
    - [New database table](#new-database-table)
    - [New contract](#new-contract)
      - [Contract code](#contract-code)
      - [Create a contract](#create-a-contract)
      - [Contract name](#contract-name)
      - [Data](#data)
      - [Conditions](#conditions)
      - [Action](#action)
      - [Full contract code](#full-contract-code)
      - [Save and run](#save-and-run)
  - [Part 3: Page](#part-3-page)
    - [New field](#new-field)
    - [Update the contract](#update-the-contract)
    - [Page](#page)
      - [Designer views](#designer-views)
      - [Developer view](#developer-view)
      - [Fetch data from the database table](#fetch-data-from-the-database-table)
      - [Save the page](#save-the-page)
  - [Part 4: Application](#part-4-application)
    - [Menu](#menu)
      - [Add a menu item](#add-a-menu-item)
      - [Test the new menu item](#test-the-new-menu-item)
    - [Send a message](#send-a-message)
      - [Form](#form)
    - [Form navigation](#form-navigation)
      - [Navigation buttons](#navigation-buttons)
      - [Variables](#variables)
      - [Entry count](#entry-count)
      - [Table offset](#table-offset)
      - [Button code](#button-code)
      - [Page refreshing](#page-refreshing)
  - [Conclusions](#conclusions)


## The Goal 

The application begins with simple functions but grows in complexity as the tutorial progresses. 

In the final version of the application, some simple messages (strings) are stored in a database table, which contains the timestamps and account identifiers of senders. Users can view the messages list and add a new message from the application page which can be accessed from the menu of the ecosystem. 

## Part 1: The Environment

**Weaver** 

As the only client of IBAX, Weaver provides functions for all users and ecosystem roles. With it, application developers can develop and test their applications, ecosystem administrators can manage their ecosystems, while users can interact with the ecosystems. 

In this tutorial, you are going to code contracts, page templates and perform all other actions in Weaver. Weaver also provides a way to restore, save and execute contract codes, manage data structures (database tables), assign access permissions and create applications.

Each node has its own Weaver instance.
## Part 2: Contract 

Your first simple application is "Hello, World!".

> Note

> In this application, strings will be stored in a database table, and there is not a user page. 

### Creator account 

Accounts with the Developer role will be assigned the "root" privileges of the ecosystem. By default, this role can access all actions. In a new ecosystem, the creator account will be assigned the Admin role, which you must use it to introduce major changes to the ecosystem, such as creating new applications and database tables.

Log in to the ecosystem using the creator account.

### New application 

Once you logged in as the ecosystem creator, you can create a new application. 

Create a new application: 

1. Go to the Developer tab;

 2. Select Application in the menu at the left; 

 3. Select New at the application page; 

 4. Specify the application name in the Name field;

 5. Set Conditions to `true`;

 `true` means anyone can make changes to the application; 

 Another option is `ContractConditions("MainCondition")`, which means no one can make changes to the application except for the creator. 

 6. Your application will be displayed in the applications list, click the Name field of a specific application to activate it.

> Note

>  You can access relevant resources by clicking an application in the Developer tab, no impact on the ecosystem. No matter which one you choose, all ecosystem applications are still available.

### New database table 

To store the data, create a database table for the application in Weaver.

Create a data table: 

 1. In the Developer tab, select Application - Name > Database table; 

 All database tables in relation to the application selected will be displayed here. If the list is empty, then, no database tables have been created for your application yet. 

 2. Click New；

 Weaver will show you the page to create a new database table.

 3. Specify the name in the Name field; 

 In this tutorial, the name of the database table will be `apptable`. 

 4. Add the `message` column, set its type as `Text`;

 This table must have two columns: `id` (predefine) and `message`. You are going to add more columns later. 

 5. With respect to the read and write permissions, set each field to `true`; 

 This will allow anyone to insert, update entries, add columns and read entry data on the database table;

 As an option, you may reserve the read and write permissions to the creator account. In this case, set this field to `ContractConditions("MainCondition")`.

### New contract 

#### Contract code 

Each contract has three parts. For more details, please see: [Contract structure](../topics/script.md#contract-structure)。

#### Create a contract 

1. In the Developer tab, select Application - Name > Contract; 

 All contracts in relation to the application will be displayed here. The list is empty for new applications. 

2. Click New;

 A new contract template will be displayed in the editor. 

An empty contract template is shown as below: 

```
contract ... {
    data {

    }
    conditions {

    }
    action {

    }
}
```

####  Contract name 

First, please specify the contract name. 

```  
    contract AppContract {

    }
```

#### Data 

Fill in the `data` section.

In the following example, `Message` refers to the variable name, while `string` the variable type. 

```
    data {
        Message string
    }
```

#### Conditions 

Fill in the `conditions` section. A simple verification condition is to avoid empty strings. If the length of `Message` is `0`, a predefined warning message will be triggered when implementing the contract. 

```
conditions {
    // avoid writing empty strings
    if Size($Message) == 0 {
        error "Message is empty"
    }
}
```

#### Action 

Fill in the `action` section. A simple action is to write `Message` into the data table. 

```
    action {
        DBInsert("apptable", {message: $Message})
    }
```

#### Full contract code 

The full contract code is shown below. 

All contracts in IBAX will be constructed like this, including the `data`, `conditions` and `action` sections. 

```
contract AppContract {
    data {
        Message string
    }
    conditions {
        // avoid writing empty strings
        if Size($Message) == 0 {
            error "Message is empty"
        }
    }
    action {
        DBInsert("apptable", {message: $Message})
    }
}
```
#### Save and run 

Now, we are preparing to test the contract: 

1. Click Save in the editor's menu; 

 This will update the contract code, and the updated version will be available to all network nodes. 

2. Click Run in the editor's menu; 

 This will display the Run the Contract page. 

3. In the Run the Contract page, fill in the input parameters of the contract; 

 As this contract has one parameter `Message`, set `Message` at the Key field and `Hello, World` at the Value field.

4. Click Run. 

 The result will be displayed at the right. 

If successfully added some strings, then, the result will contain the block ID and result code to introduce the change of transactions. 

```
{
 "block": "31",
 "result": null
}
```

## Part 3: Page 

When the contract becomes effective, it is time to extend it to something useful. In this part, you are going to implement the UI and other functions. 

Note

In this application, strings will be stored in a database table, like entries in a log. Each string will have an author and timestamp. 

Users can view the list of strings stored at the application page, which is shown as a simple form then. 

### New field 

As with the previous, edit the database table at the Developer tab > Application - Name > Database table page; 

Add the following fields into `apptable`:

*  `author` , field type `Number`, set Change to `true`;

 This field will store the identifier of the author account. 

*  `timestamp` , field type `Date/Time`, set Change to `true`.

### Update the contract 

We will update the contract code to handle the author ID and timestamp. 

The author ID is the account ID of the ecosystem. The timestamp is the date and time executing the contract in Unix time format. 

As both values are provided by the [Predefined variables](../topics/script.md#variables) and no need to input or verify the predefined variables, they can only be updated in the action part. 

Update the contract to write the author ID and timestamp into the database table when adding a message, among which the author ID is defined by `$key_id`, while the timestamp by `$time`.

```
action {
 DBInsert("apptable", {message: $Message, author: $key_id, timestamp: $time})
}
```

### Page 

For the application page, it is a simple page where displays the messages stored in the database table. 

Like all other resources, you can create the UI page in Weaver: 

1.Navigate to the Developer tab, click Application - Name > Page; 

2.Click New; 
 The visual designer will be opened in a new tab. 

#### Designer views 

The default page is empty. You can use the predefine structure to quickly fill in the page. 

Create a basic table: 

1. In the view selector at the right, click Designer; 
 The view will be switched to the visual designer. 

2. In the menu at the left, select Table With Header and drag it on to the page. 
    A table with multiple elements will be displayed on the page. 

#### Developer view 

As the user page of IBAX is coded with a [Template Language](../topics/templates2.md), please switch to the Developer view when writing the page code. 

Switch to the Developer view. 

1. In the view selector at the right, click Developer. 

 The view will be switched to the editor with a tab holding the page code. 

#### Fetch data from the database table 
So far, nothing done with the page template. In the next, we will update the code to allow the page to display data from `apptable`.

1. To request data from the database table with the [DBFind](../topics/script.md#dbfind) function; 

 In the following example, this function call is used to fetch data from `apptable`. The data will be put it in the source `src_table` and sorted by the timestamp field. `src_table` will be later used as the data source for the page in table view.

 ```
    DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)
 ```

2. To display the data from `src_table`, specify it as the data source and the header in the `Table` function. 

```
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
```

3. In the view selector at the right, click Preview to check whether the data is displayed correctly. 

#### Full page code 

The following is the full page code for this part. This basic page will be expanded later.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp)

Div(Class: panel panel-primary) {
    Div(Class: panel-heading, Body: Table block)
    Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
    Div(Class: panel-footer text-right) {
    Button(Class: btn btn-primary, Contract: ContractName, Body: More)
    }
}

```

#### Save the page 

Click Save to save the page: 

1. Specify `AppPage` or any other name for the page in the Page Name field;

2. Select `default_menu` in the Menu; 

3. Set Conditions to `true`;

4. Click OK. 

## Part 4: Application 

In the previous sections, you created a contract, a table to store data, and a basic UI page to display that data.

In this part, you are going to finalize the application to make its appearance and actions are similar to an actual one.

### Menu 

The page needs to be linked to a menu, for example, `default_page` displayed on the Home tab is linked to the default ecosystem menu `default_menu`.

As this application tutorial is very simple (only having one page), there is no need to create a separate menu for it. The new menu item in the default menu is sufficient. 

> Note

> You can define the page menu by editing the page properties at the Developer tab > Application - Name > Page. For example, if your app has multiple pages, you may need to create a menu to navigate between these pages and assign it to all pages of the app.

#### Add a menu item 

Like all other resources, menus can be created and edited in Weaver:

1. Navigate to the Developer tab > Menu;

2. Click the Name of the `default_menu` entry; 

 A new tab will be opened in the editor.

3. Add a new menu item to the end of the template, which will be linked to open the application page and its icon comes from the [FontAwesome](https://fontawesome.com/icons) icon set. 

```
    MenuItem(Title:Messages, Page:AppPage, Icon:"fa fa-envelope")
```

4. Click Save. 
#### Test the new menu item 

Check whether the new menu item is valid:

1. Open the Home tab;

2. Click Refresh in the menu;

    An entry with a header of Messages will appear; 

3. Click Messages.

    The application page will be opened. 
### Send a message 

The buttons in Logicor can be used to implement contracts and open pages, depending on the parameters.

The [Button](../topics/templates2.md#button) function has two contract parameters: 

*  `Contract`

     Name of the contract activated. 

*  `Params`

    Input parameters of the contract. 

#### Form 

To send data to the contract, add a form on the application page, which must have an input field for a message and a button to activate the contract AppContract.

The following is an example of this type of form. It is nested in its own [Div](../topics/templates2.md#div). Putting it after the Div element that contains the form view, which defines that the [Input](../topics/templates2.md#input) field has a predefine name `message_input`. The button uses this name to send the value of `Message` to the contract. Finally, the [Val](../topics/templates2.md#calling-contracts) function is used to get the value of the input field.

```
Div(Class: panel panel-primary) {
 Form() {
 Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
 Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)")
 }
}
```

You may notice that when testing this new feature by sending a message, the form does not refresh. This will be introduced in [page refresh](#page-refreshing).

### Form navigation 

Under the default view, the form on the page can only display 25 entries on the first page. Hence, you can add some simple buttons to navigate users to all form entries.

#### Navigation buttons 

There will be two navigation buttons, and each of them could reload the application page and pass the parameters to it.

*  The Previous button will display the first 25 entries. If there are no other entries, the button will not be displayed;

*  The Next button will display the next 25 entries. If there are no other entries, the button will not be displayed.

#### Variables 

The navigation buttons require two variables to store the table view states:

*  `#table_view_offset#`

This variable stores the offset of current table view.

The navigation buttons will pass it as a parameter when the page is reloaded.

*  `#record_count#`

 This variable stores the total number of entries in the table.

 The value will be calculated.

#### Entry count 

To count `#record_count#`, please modify the existing [DBFind](../topics/script.md#dbfind) function call. The variable specified in the `.count()` call will store the entry count.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count)
```

#### Table offset 

The table view offset must be passed to the page when the page is opened. If `#table_view_offset#` does not get a value, set it to 0.

Add the following code to the top of the page.

```
If(GetVar(table_view_offset)){

}.Else{
    SetVar(table_view_offset, 0)
}
```

Modify the [DBFind](../topics/script.md#dbfind) function call again. This time it must use the new table view offset.

```
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
```

#### Button code 

Find the [Div](../topics/templates2.md#div) function call that defines the footer: `Div(Class:panel-footer text-right)`. Add the button code into it.

```
Div(Class: panel-footer text-right) {
}
```

The *Previous* button will only appear if there is at least one Next to return. When adding a button, the new table view offset `offset_previous` of the page will be calculated. The parameters are passed to `PageParams` of the reopened page.

```
If(#table_view_offset# >= 25) {
    SetVar(offset_previous, Calculate(#table_view_offset# - 25))
    Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
}
```

The Next button will only be displayed when the total number of records is greater than the number displayed on the page. When a button is added, the new table view offset `offset_next` of the page will be calculated. The parameters are passed to `PageParams` of the reopened page.

```
If(#record_count# >= Calculate(#table_view_offset# + 25)) {
    SetVar(offset_next, Calculate(#table_view_offset# + 25))
    Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
}
```

After adding these buttons, save the page and test it from the Home > Messages menu item.

#### Page refreshing 

The last function to be implemented is to automatically update the table on the page. When users send a new message, it must be displayed in the table.

In addition to implementing the contract, you may also use the Send button to reopen the current page to achieve the same. `#table_view_offset#` must be passed to the page without any change.

Add `Page` and `PageParams` to the Send button, the code is as follows:

```
Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
```


### Full page code 

This part describes many changes to the application page. The following is the full code of the application page.

```
If(GetVar(table_view_offset)){
}.Else{
    SetVar(table_view_offset, 0)
}
DBFind(Name: apptable, Source: src_table).Columns(Columns: "author,timestamp,message").Order(timestamp).Count(record_count).Offset(#table_view_offset#)
    Div(Class: panel panel-primary) {
        Div(Class: panel-heading, Body: Table block)
        Table(Columns: "AUTHOR=author,TIME=timestamp,MESSAGE=message", Source: src_table)
        Div(Class: panel-footer text-right) {
            If(#table_view_offset# >= 25) {
                SetVar(offset_previous, Calculate(#table_view_offset# - 25))
                Button(Class: btn btn-primary, Body: Previous, Page: AppPage, PageParams:"table_view_offset=#offset_previous#")
            }
            If(#record_count# >= Calculate(#table_view_offset# + 25)) {
                SetVar(offset_next, Calculate(#table_view_offset# + 25))
                Button(Class: btn btn-primary, Body: Next, Page: AppPage, PageParams:"table_view_offset=#offset_next#")
            }
        }
    }
    Div(Class: panel panel-primary) {
    Form() {
        Input(Name: message_input, Class: form-control, Type: text, Placeholder: "Write a message...", )
        Button(Class: btn btn-primary, Body: Send, Contract: AppContract, Params: "Message=Val(message_input)", Page:AppPage, PageParams:"table_view_offset=#table_view_offset#")
    }
}
```

## Conclusions 

Instead of expounding other important topics for application developers, such as layout styles, access permissions management and interaction between applications and resources, this tutorial introduces how to create a basic application for an ecosystem. For more information on these advanced topics, see other relevant documents.

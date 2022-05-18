class OperationExecutor {
  constructor() {
    this.state = {
      0: this.firstTaskExecute,
      1: this.secondTaskExecute,
      2: this.thirdTaskExecute,
      3: this.fourthTaskExecute,
      4: this.fifthTaskExecute,
      5: this.sixthTaskExecute,
      6: this.seventhTaskExecute,
      7: this.eighthTaskExecute,
      8: this.ninthTaskExecute,
      9: this.tenthTaskExecute,
    };
  }

  /**
   * Execute some transformation of incoming arg
   * @param actionType – type of transformation
   * @param arg – incoming arg
   * @returns object with result
   */
  execute(actionType, arg) {
    return this.state[actionType](arg);
  }

  /**
   * First task of homework
   * @param arg – object that you should clone
   * arg = { obj1: { ... } }
   * @returns clone of the arg
   */
  firstTaskExecute = (arg) => ({ ...arg });

  /**
   * Second task of homework
   * @param arg – object with values that you should combine
   * arg = { obj1: { ... }, obj2: { ... } }
   * @returns combination of objects
   */
  secondTaskExecute = (arg) => Object.assign({}, ...Object.values(arg));

  /**
   * Third task of homework
   * @param arg – object with value that you should modify
   * arg = { obj1: { ... } }
   * @returns modified object
   */
  thirdTaskExecute = (arg) => {
    const user = arg.obj1;

    user.relatives.forEach((relative) => {
      if ((relative.firstName === 'Tanya') || (relative.firstName === 'Lena')) {
        relative.gender = 'female';
      } else {
        relative.gender = 'male';
      }
    });

    return user;
  };

  /**
   * Fourth task of homework
   * @param arg – object with value that contains relatives
   * arg = { obj1: { ... relatives: [ ... ] ... } }
   * @returns modified object
   */
  fourthTaskExecute = (arg) => {
    const user = arg.obj1;

    user.greeting = `Hello ${user.firstName} ${user.lastName}!`;

    user.relatives.forEach((relative) => {
      relative.greeting = `Hello ${relative.firstName} ${relative.lastName}!`;
    });

    return user;
  };

  /**
   * Fifth task of homework
   * @param arg – object which contains new color of the button and the class of it
   * arg = { color: '...', className: '...' }
   */
  fifthTaskExecute = (arg) => {
    const button = document.getElementsByClassName(arg.className)[0];

    button.style.backgroundColor = arg.color;
  };

  /**
   * Sixth task of homework
   * @param arg – object with values that you should handle
   * arg = { ... }
   * @returns array of items that match the hostname on which the application is running
   */
  sixthTaskExecute = (arg) => {
    const filteredHostNames = arg.hostNames.filter(
      (hostName) => hostName === window.location.hostname
    );

    return filteredHostNames;
  };

  /**
   * Seventh task of homework
   * @param arg – object which contains simple key-value pairs
   * arg = { key: value }
   * @returns obj that contains swap pairs ('value: key')
   */
  seventhTaskExecute = (arg) => {
    /**
     * Place your code here
     */

    const entries = Object.entries(arg);

    entries.forEach((elem) => {
      [elem[0], elem[1]] = [elem[1], elem[0]];
    });

    return Object.fromEntries(entries);
  };

  /**
   * Eighth task of homework
   * @param arg – object which contains two array
   * arg = { ... }
   * @returns obj that built using array's values
   */
  eighthTaskExecute = (arg) => {
    /**
     * Place your code here
     */

    const arr = [...arg.arr1, ...arg.arr2];

    const arr1 = arr.filter((_, index) => index % 2 === 0);
    const arr2 = arr.filter((_, index) => index % 2 === 1);

    const result = arr1.reduce((target, elem, index) => {
      target[elem] = arr2[index] !== undefined ? arr2[index] : null;
      return target;
    }, {});

    return result;
  };

  /**
   * Ninth task of homework
   * @param arg – object which contains array of users
   * arg = { users: [...] }
   * @returns obj that contains pairs id: obj with this id
   */
  ninthTaskExecute = (arg) => {
    /**
     * Place your code here
     */

    const result = arg.users.map((elem) => ({
      [elem.id]: elem,
    }));

    return Object.assign({}, ...result);
  };

  /**
   * Tenth task of homework
   * @param arg – object which contains class of item and empty array
   * arg = { key: value }
   * @returns obj that contains the array with info about
   * children of the node and className of that node
   */
  tenthTaskExecute = (arg) => {
    /**
     * Place your code here
     */

    const elem = document.getElementsByClassName(arg.className)[0];

    const children = Array.from(elem.children);

    const result = children.map((child) => ({
      className: child.className,
      tagName: child.tagName,
    }));

    return {
      childrenInfo: result,
      className: arg.className
    };
  };
}

export default OperationExecutor;

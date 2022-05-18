import OperationExecutor from './operationExecutor';
import data from './data/data';

const operationExecutor = new OperationExecutor();

describe('Operation executor tests', () => {
  test('1 task', () => {
    const { code } = data.taskList[0];

    const result = operationExecutor.firstTaskExecute(code);

    expect(result).not.toBe(code);
    expect(result).toStrictEqual(code);
    result.test = 'test';
    expect(result).not.toStrictEqual(code);
  });

  test('2 task', () => {
    const { code } = data.taskList[1];
    const expectedResult = {
      a: 1, b: 7, c: 8, d: 9
    };

    const result = operationExecutor.secondTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('3 task', () => {
    const { code } = data.taskList[2];
    const expectedResult = {
      firstName: 'Vasya', lastName: 'Ivanov', gender: 'male', relatives: [{ firstName: 'Tanya', lastName: 'Ivanova', gender: 'female' }, { firstName: 'Lena', lastName: 'Ivanova', gender: 'female' }, { firstName: 'Roma', lastName: 'Ivanov', gender: 'male' }]
    };

    const result = operationExecutor.thirdTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('4 task', () => {
    const { code } = data.taskList[3];
    const expectedResult = {
      firstName: 'Vasya',
      lastName: 'Ivanov',
      gender: 'male',
      greeting: 'Hello Vasya Ivanov!',
      relatives: [{
        firstName: 'Tanya', lastName: 'Ivanova', gender: 'female', greeting: 'Hello Tanya Ivanova!'
      }, {
        firstName: 'Lena', lastName: 'Ivanova', gender: 'female', greeting: 'Hello Lena Ivanova!'
      }, {
        firstName: 'Roma', lastName: 'Ivanov', gender: 'male', greeting: 'Hello Roma Ivanov!'
      }]
    };

    const result = operationExecutor.fourthTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('5 task', () => {
    document.body.innerHTML = '<button class="button_4" />';
    const code = {
      color: 'red',
      className: 'button_4'
    };

    operationExecutor.fifthTaskExecute(code);
    const element = document.getElementsByClassName('button_4')[0];

    expect(element.style.backgroundColor).toBe(code.color);
  });

  test('6 task', () => {
    const { code } = data.taskList[5];
    const expectedResult = ['localhost', 'localhost', 'localhost', 'localhost'];

    const result = operationExecutor.sixthTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('7 task', () => {
    const { code } = data.taskList[6];
    const expectedResult = {
      value1: 'key1',
      value2: 'key2',
      value3: 'key3',
      value4: 'key4'
    };

    const result = operationExecutor.seventhTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('8 task', () => {
    const { code } = data.taskList[7];
    const expectedResult = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
      key4: null
    };

    const result = operationExecutor.eighthTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('9 task', () => {
    const { code } = data.taskList[8];
    const expectedResult = {
      0: {
        firstName: 'Tanya',
        id: 0,
        lastName: 'Ivanova'
      },
      1: {
        firstName: 'Lena',
        id: 1,
        lastName: 'Ivanova'
      },
      2: {
        firstName: 'Roma',
        id: 2,
        lastName: 'Ivanov'
      }
    };

    const result = operationExecutor.ninthTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });

  test('10 task', () => {
    document.body.innerHTML = '<div class="task task_9">\n'
      + '    <h3 class="task__titile">Задание 10</h3>\n'
      + "    <p class=\"task__description\">Найдите элемент DOM дерева с именем класса, указанным ниже, а затем добавьте в массив childrenInfo объекты с информацией о имени тега и имени класса каждого 'ребёнка' найденного узла.</p>\n"
      + '    <pre class="task__code ">            <code class="task__code-line">{</code>\n'
      + '            <code class="task__code-line">  "className": "task_9",</code>\n'
      + '            <code class="task__code-line">  "childrenInfo": []</code>\n'
      + '            <code class="task__code-line">}</code>\n'
      + '    </pre>    <button class="button button_9" type="button">Выполнить</button></div>';
    const { code } = data.taskList[9];
    const expectedResult = {
      childrenInfo: [
        {
          className: 'task__titile',
          tagName: 'H3'
        },
        {
          className: 'task__description',
          tagName: 'P'
        },
        {
          className: 'task__code ',
          tagName: 'PRE'
        },
        {
          className: 'button button_9',
          tagName: 'BUTTON'
        }
      ],
      className: 'task_9'
    };

    const result = operationExecutor.tenthTaskExecute(code);

    expect(result).toStrictEqual(expectedResult);
  });
});

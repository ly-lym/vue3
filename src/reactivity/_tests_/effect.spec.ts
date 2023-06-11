import {describe, expect, jest, test} from '@jest/globals';
import {effect,stop} from "../effect"
import { reactive } from "../reactive";
describe('effect',()=>{
    test("path", ()=>{
        const user = reactive({
            age:10,
        });
        let  nextAge;
        effect(() =>{
            nextAge = user.age + 1;
        })
        expect(nextAge).toBe(11);
        user.age++;
        expect(nextAge).toBe(12);
        
    });
    test("return effect res",() => {
        let foo =10;
        const runner = effect(()=>{
            foo++;
            return "foo";
        })
        expect(foo).toBe(11);
        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe("foo");
    });
    test("scheduler",() =>{
        //当expect第一次执行的时候，还会执行fn
        //当响应式set update 不会执行fn,而是执行scheduler
        //当执行runner才会再次执行fn
        
        let dummy;
        let run: any;
        const scheduler = jest.fn(()=>{
            run = runner;
        })
        const obj = reactive({foo:1});
        const runner =effect( () =>{
            dummy = obj.foo;
        },{scheduler})
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        obj.foo++;
        expect(scheduler).toHaveBeenCalledTimes(1);
        expect(dummy).toBe(1);
        run();
        expect(dummy).toBe(2);
    });
    test("stop", () => {
        let dummy;
        const obj = reactive({ prop: 1 });
        const runner = effect(() => {
          dummy = obj.prop;
        });
        obj.prop = 2;
        expect(dummy).toBe(2);
        stop(runner);
        // obj.prop = 3
        obj.prop++;
        expect(dummy).toBe(3);
    
        // stopped effect should still be manually callable
        runner();
        expect(dummy).toBe(3);
      });
      test("onstop", () => {
        let dummy;
        const obj = reactive({ prop: 1 });
        const onStop = jest.fn();
        const runner = effect(() => {
          dummy = obj.prop;
        },{
            onStop,
        });
        stop(runner);
        expect(onStop).toBeCalledTimes(1);
      });
});
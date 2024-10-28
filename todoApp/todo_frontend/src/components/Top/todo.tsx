import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { getToDoList, getToDoList2, postCreateTodo, patchCheckTodo, deleteTodo } from '../api/todo_api';
import { useState, useEffect } from 'react';

const Top = () => {

    const [todoList, setTodoList] = useState<Todo[]>([])
    const [todoName, setTodoName] = useState("")

    //APIへのリクエスト処理
    //useEffectは、コンポーネントがマウントされたときや更新されたときに実行される副作用を定義するために使用
    //第二引数に依存配列を渡すことで、特定の値が変わったときのみ副作用を再実行するように制御できる
    //依存配列 ([]) の使い方: なし: 毎回のレンダリング後に実行  空配列 ([]): 初回レンダリング時のみ実行  特定の値を指定 ([count]): count が変わったときのみ実行される。
    useEffect(() => {
        (async () => {
            try {
                const list = await getToDoList2();
                setTodoList(list);
            } catch (error) {
                console.error("Error fetching todo list:", error);
            }
        })();
    }, []);
    
    const handleSetTodo = (e: any) => {
        setTodoName(e.target.value)
    }

    const handleCreate = async () => {
        if(todoName === "" || todoList.some(value =>todoName === value.name)) 
            return ;
        await postCreateTodo(todoName)
        setTodoList(await getToDoList2())
        setTodoName("");
    };

    const handleCheck = async (e) => {
        const todoID = e.target.value;
        const checked = e.target.checked;
        const list: Todo[] = todoList.map((value, index) => {
            if (value.id.toString() === todoID) {
                return { ...value, checked: checked }; // checked ステータスを更新
            }
            return value; // それ以外の TODO はそのまま返す
        })
        setTodoList(list)
        await patchCheckTodo(todoID, checked);
    }

    const handleDelete = async (id: number) => {
        const todoId = id;
        const list = todoList.filter( value => value.id !== todoId);
        setTodoList(list);
        await deleteTodo(todoId);
    }



    return (
        <Container maxWidth="xs">
            Hello World!
            <Box display="flex" justifyContent="space-between" mt={4} mb={4}>
                <TextField label="やること" variant="outlined" size="small" value={todoName} onChange={handleSetTodo}/>
                <Button variant="contained" color="primary" onClick={handleCreate}>作成</Button>
            </Box>
            <FormGroup>
                {todoList.map((todo, index)=>{
                    return(
                        <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox value={todo.id} onChange={handleCheck} checked={todo.checked ? true : false}/>
                                }
                                label={todo.name}
                            />
                            <Button variant="outlined" data-id={todo.id} onClick={() => handleDelete(todo.id)}>削除</Button>
                        </Box>
                    )
                })}
            </FormGroup>
        </Container>
    )
};
export default Top;
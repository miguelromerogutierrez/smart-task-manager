import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react"
import { Todo } from "./types"

interface TodoListPropsI {
  todos: Todo[]
}

export const TodoList = ({
  todos
}: TodoListPropsI) => {
  return (
    <div>
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Td>Title</Td>
              <Td>Status</Td>
            </Tr>
          </Thead>
          <Tbody>
            {
              todos.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.title}</Td>
                  <Td>{todo.status}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
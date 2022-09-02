import { Play } from 'phosphor-react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="De um nome para seu projeto"
            list="task-suggestions"
          />

          <datalist id="task-suggestions" >
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Vai se fode" />
          </datalist>

          <label htmlFor="">Durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount"  
            placeholder="00" 
            step={5}
            max={60}
            min={5}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton type="submit" >
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}

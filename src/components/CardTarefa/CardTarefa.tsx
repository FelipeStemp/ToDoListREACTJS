import { Card, CardActionArea, CardContent, Chip, TextField, Typography } from '@mui/material'
import * as S from './styled'
import { ApiModel } from '../../Interface/Model'


function CardTarefa({ name, description, _id, completed }: ApiModel) {
    return (
        <S.BodyCard>
            <Chip
                label={completed ? 'Concluído' : 'Pendente'}
                sx={{ color: "white", backgroundColor: completed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(175, 3, 0, 0.3)', border: completed ? ' 2px solid #00FF00' : '2px solid #AF0300' }}
                variant={completed ? 'outlined' : 'filled'}
                size="small"
            />
            <S.HeaderCard>
                <h5>{name}</h5>
            </S.HeaderCard>

            <S.DescBody>
                <a>{description}</a>
            </S.DescBody>
        </S.BodyCard>
    )
}

export default CardTarefa
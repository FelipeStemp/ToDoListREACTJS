import { CardActionArea, Chip, } from '@mui/material'
import * as S from './styled'
import { ApiModel } from '../../Interface/Model'
import { useState } from 'react';
import CardList from '../Card/Card';

interface CardTarefaProps extends ApiModel {
    fetchData: () => void;
  }

function CardTarefa({ name, description, _id, completed, fetchData }: CardTarefaProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<string | null>();

    const handleOpenModal = (id: string) => {
        setIdSelected(id)
        setIsModalOpen(true)
    };
    const handleCloseModal = () => {
        setIdSelected(null)
        setIsModalOpen(false);
    };

    return (

        <CardActionArea sx={{width: 'fit-content', height: 'fit-content'}}
            onClick={() => handleOpenModal(_id || '')}
        >
            <S.BodyCard>
                <Chip
                    label={completed ? 'Concluído' : 'Pendente'}
                    sx={{
                        color: "white", backgroundColor: completed ? 'rgba(0, 255, 0, 0.2)' : 'rgba(175, 3, 0, 0.5)',
                        position: 'absolute', left: 5, top: 5,
                        borderRadius: '.3rem',
                        border: 'none'
                    }}
                    variant={completed ? 'outlined' : 'filled'}
                    size="small"
                />
                <S.HeaderCard>
                    <h3 style={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{name}</h3>
                </S.HeaderCard>
            </S.BodyCard>

            {idSelected &&
                <CardList
                    id={idSelected}
                    ativo={false}
                    open={isModalOpen}
                    handleClose={handleCloseModal}  
                    fetchData={() => fetchData()}                  
                />
            }
        </CardActionArea>

    )
}

export default CardTarefa
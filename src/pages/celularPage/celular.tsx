import { useState } from 'react';
import CardTarefa from '../../components/CardTarefa/CardTarefa';
import { ApiModel } from '../../Interface/Model';
import * as S from './styled'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';


interface conteudo {
    data: ApiModel[];
}

function CelPage({ data }: conteudo) {
    const [openModal, setOpenModal] = useState(false)
    const [idSelected, setIdSelected] = useState<string | null>()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOpenModal = (id: string) => {
        setIdSelected(id)
        setOpenModal(true)
    };
    const handleCloseModal = () => {
        setIdSelected(null)
        setOpenModal(false);
    };

    return (
        <S.BodyCel>
            <S.Filtros>
                <TextField />
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon fontSize='large' sx={{color: 'white'}}/>
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>

            </S.Filtros>

            <S.Cards>

                {data.map((tarefas) => (
                    <CardTarefa
                        key={tarefas._id}
                        name={tarefas.name}
                        _id={tarefas._id}
                        description={tarefas.description}
                        completed={tarefas.completed}
                        click={() => handleOpenModal(tarefas._id || "")}
                    />
                ))}
            </S.Cards>
        </S.BodyCel>
    )
}

export default CelPage
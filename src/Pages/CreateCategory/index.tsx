import React, {useState} from 'react';
import api from '../../services/api';
import "react-colorful/dist/index.css";
import {CreateCategoryJumbotron, CreateCategoryContainer, CreateCategoryForm, CreateCategoryButton} from './styles';
import { HexColorPicker } from 'react-colorful';

interface ICategory {
  name: string;
  color: string;
  visible: boolean
}

const CreateCategory: React.FC = () => {
  const [category, setCategory] = useState<ICategory>({name: '', color: '', visible: true});

  const [color, setColor] = useState("#aabbcc");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCategory = {
      name: category.name,
      color: color,
      visible: category.visible
    }

    window.confirm("Um nova categoria será criado, confirma as informações?") &&
    api
      .post('api/categories/', newCategory)
      .then(res => {
        console.log(res.data);

        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });



  }
  return (
    <>
      <CreateCategoryJumbotron fluid>
        <h3>Creare New Category</h3>
      </CreateCategoryJumbotron>
      <CreateCategoryContainer>
        <CreateCategoryForm onSubmit={onSubmit}>
          <CreateCategoryForm.Group>
            <CreateCategoryForm.Label>Nome da Categoria</CreateCategoryForm.Label>
            <CreateCategoryForm.Control
              type="text"
              required
              value={category.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
                setCategory({...category, name: e.target.value })
              }
            />
          </CreateCategoryForm.Group>

          <CreateCategoryForm.Group>
            <CreateCategoryForm.Label>Cor</CreateCategoryForm.Label>
            <CreateCategoryForm.Control
              type="text"
              value={color}
              readOnly
            />
          </CreateCategoryForm.Group>

          <CreateCategoryForm.Group>
            <HexColorPicker color={color} onChange={setColor} />
          </CreateCategoryForm.Group>

          <CreateCategoryForm.Group>
            <CreateCategoryButton type="submit" variant="primary">
              Create Category
            </CreateCategoryButton>
          </CreateCategoryForm.Group>


        </CreateCategoryForm>
      </CreateCategoryContainer>
    </>
  )
}

export default CreateCategory;

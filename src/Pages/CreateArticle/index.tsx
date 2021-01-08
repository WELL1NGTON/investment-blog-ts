import React, { useState ,  useEffect} from 'react';
import api from '../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, Image } from 'react-bootstrap';
import {
  CreateArticleForm,
  CreateArticleButton,
  CreateArticleContainer,
  CreateArticleJumbotron,
  ItemGrid,
} from './styles';

interface Article {
  title: string;
  author: string;
  previewImg: string;
  visibility: 'ALL' | 'EDITORS' | 'USERS';
  state: 'EDITING' | 'PUBLISHED';
}

interface OptionType {
  value: string;
  label: string;
}

const visibilityOptions: OptionType[] = [
  { value: 'ALL', label: 'Todos' },
  { value: 'EDITORS', label: 'Editores' },
  { value: 'USERS', label: 'Assinantes' },
];

const stateOptions: OptionType[] = [
  { value: 'EDITING', label: 'Editando' },
];

const CreateArticle: React.FC = () => {
  const DEFAULT_IMG = '';
  const [article, setArticle] = useState<Article>({
    title: '',
    author: '',
    previewImg: '',
    visibility: 'EDITORS',
    state: 'EDITING',
  });
  const [selectedVisibilityOption, setSelectedVisibilityOption] = useState('ALL');
  const [selectedStateOption, setSelectedStateOption] = useState('EDITING');

  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    api.get('api/images').then(res => {
      setImages(
        res.data.images.map((image: { url: any; slug: any }) => {
          if (process.env.NODE_ENV === 'production')
            return typeof image.url === 'string' ? image.url : DEFAULT_IMG;

          return typeof image.slug === 'string'
            ? (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') +
                '/api/images/' +
                image.slug
            : DEFAULT_IMG;
        }),
      );
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newArticle = {
      title: article.title,
      author: article.author,
      previewImg: selectedImage ? selectedImage : undefined,
      visibility: selectedVisibilityOption,
      state: selectedStateOption,
    };


    window.confirm("Um novo post será criado, confirma as informações?") &&
    api
      .post('api/articles/', newArticle)
      .then(res => {
        console.log(res.data);

        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });

    // window.location = '/';
  };

  return (
    <>
      <CreateArticleJumbotron fluid>
        <h3>Criar Artigo</h3>
      </CreateArticleJumbotron>
      <CreateArticleContainer>
        <CreateArticleForm onSubmit={onSubmit}>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Titulo: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              required
              value={article.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Imagens disponiveis</CreateArticleForm.Label>
            <ItemGrid>
              {images.map((image, i) => (
                <li key={i}>
                  <Image
                    src={image}
                    thumbnail
                    onClick={() => setSelectedImage(image)}
                  />
                </li>
              ))}
            </ItemGrid>
          </CreateArticleForm.Group>
          <CreateArticleForm.Group>
            <CreateArticleForm.Label>Autor: </CreateArticleForm.Label>
            <CreateArticleForm.Control
              type="text"
              required
              value={article.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArticle({ ...article, author: e.target.value })
              }
            />
          </CreateArticleForm.Group>
          <CreateArticleForm.Row>
            <CreateArticleForm.Group as={Col}>
              <CreateArticleForm.Label>Visibilidade: </CreateArticleForm.Label>
              <CreateArticleForm.Control
                as="select"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedVisibilityOption(e.target.value)
                }
              >
                {visibilityOptions.map((r, i) => (
                  <option key={i} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </CreateArticleForm.Control>
            </CreateArticleForm.Group>
            <CreateArticleForm.Group as={Col}>
              <CreateArticleForm.Label>Estado: </CreateArticleForm.Label>
              <CreateArticleForm.Control
                as="select"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedStateOption(e.target.value)
                }
              >
                {stateOptions.map((r, i) => (
                  <option key={i} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </CreateArticleForm.Control>
            </CreateArticleForm.Group>
          </CreateArticleForm.Row>
          <CreateArticleForm.Group>
            <CreateArticleButton type="submit" variant="primary">
              Criar
            </CreateArticleButton>
          </CreateArticleForm.Group>
        </CreateArticleForm>
      </CreateArticleContainer>
    </>
  );
};

export default CreateArticle;

import React, { useState, useEffect, useRef } from 'react';
import {
  Col,
  Image,
  Overlay,
  Tooltip,
  Container,
  Row,
  FormCheck,
  Form,
} from 'react-bootstrap';
import { EditArticleForm, EditArticleButton, ItemGrid } from './styles';
import api from '../../services/api';

interface ImageSelectorProps {}

interface Image {
  id: string;
  name: string;
  uploadedBy: string;
  slug: string;
  url: string;
  date: Date;
}

const ImageSelector: React.FC<ImageSelectorProps> = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [resultFormat, setResultFormat] = useState<'HTML' | 'MARKDOWN'>(
    'MARKDOWN',
  );
  const [sizeType, setSizeType] = useState<'px' | '%' | 'default'>('default');
  const [width, setWidth] = useState<string>('100');
  const [height, setHeight] = useState<string>('100');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [images, setImages] = useState<Image[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLInputElement>(null);
  const DEFAULT_IMG = '';

  useEffect(() => {
    api.get('api/images').then(res => {
      setImages(
        res.data.images.map(
          (image: {
            _id: string;
            name: string;
            uploadedBy: string;
            slug: string;
            url: string;
            date: string;
          }): Image => {
            return {
              id: image._id,
              name: image.name,
              uploadedBy: image.uploadedBy,
              slug: image.slug,
              url:
                process.env.NODE_ENV === 'production'
                  ? typeof image.url === 'string'
                    ? image.url
                    : DEFAULT_IMG
                  : typeof image.slug === 'string'
                  ? (process.env.REACT_APP_BACKEND_URL ||
                      'http://localhost:5000') +
                    '/api/images/' +
                    image.slug
                  : DEFAULT_IMG,
              date: new Date(image.date),
            };
          },
        ),
      );
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultString(selectedImage, resultFormat));
    setShow(!show);
  };

  const resultString = (
    image: Image | null,
    resultFormat: 'HTML' | 'MARKDOWN',
  ): string => {
    if (!image) return '';
    if (resultFormat === 'HTML') {
      return `<p align=${align}><img src="${image.url}" ${
        sizeType === 'default' ? '' : `width=${width}${sizeType}`
      } ${
        sizeType === 'default' || sizeType === '%'
          ? ''
          : `height=${height}${sizeType}`
      } alt="${image.name}"/></p>`;
    } else {
      return `![${image.name}](${image.url})`;
    }
  };

  return (
    <>
      <EditArticleForm.Group>
        <EditArticleForm.Label>Imagens disponiveis</EditArticleForm.Label>
        <ItemGrid>
          {images.map((image, i) => (
            <li key={i}>
              <Image
                src={image.url}
                thumbnail
                onClick={() => setSelectedImage(image)}
              />
            </li>
          ))}
        </ItemGrid>

        <Container style={{ border: 0, padding: 0 }} fluid>
          <Row>
            <Col>
              <EditArticleForm.Control
                type="text"
                value={resultString(selectedImage, resultFormat)}
                ref={textAreaRef}
                disabled
              />
            </Col>
            <Col md="auto">
              <EditArticleButton
                onClick={copyToClipboard}
                ref={target}
                variant="primary"
              >
                copiar
              </EditArticleButton>
              <Overlay target={target.current} show={show} placement="right">
                {props => (
                  <Tooltip id="overlay-example" {...props}>
                    Copiado!
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Row>
        </Container>
        <fieldset>
          <Form.Group as={Row}>
            <Col sm="auto">
              <FormCheck
                type="radio"
                name="resultFormatSelector"
                label="MARKDOWN"
                onClick={() => setResultFormat('MARKDOWN')}
                checked={resultFormat === 'MARKDOWN'}
              />
            </Col>
            <Col sm="auto">
              <FormCheck
                type="radio"
                name="resultFormatSelector"
                label="HTML"
                onClick={() => setResultFormat('HTML')}
                checked={resultFormat === 'HTML'}
              />
            </Col>
          </Form.Group>
          {resultFormat === 'MARKDOWN' ? null : (
            <Row>
              <Col sm="auto">
                <FormCheck
                  type="radio"
                  name="alignSelector"
                  label="left"
                  onClick={() => setAlign('left')}
                  checked={align === 'left'}
                />
                <FormCheck
                  type="radio"
                  name="alignSelector"
                  label="center"
                  onClick={() => setAlign('center')}
                  checked={align === 'center'}
                />
                <FormCheck
                  type="radio"
                  name="alignSelector"
                  label="right"
                  onClick={() => setAlign('right')}
                  checked={align === 'right'}
                />
              </Col>
              <Col sm="auto">
                <FormCheck
                  type="radio"
                  name="SizeTypeSelector"
                  label="default"
                  onClick={() => setSizeType('default')}
                  checked={sizeType === 'default'}
                />
                <FormCheck
                  type="radio"
                  name="SizeTypeSelector"
                  label="px"
                  onClick={() => setSizeType('px')}
                  checked={sizeType === 'px'}
                />
                <FormCheck
                  type="radio"
                  name="SizeTypeSelector"
                  label="%"
                  onClick={() => setSizeType('%')}
                  checked={sizeType === '%'}
                />
              </Col>
              <Col sm="auto">
                {sizeType === 'px' || sizeType === '%' ? (
                  <Form.Group as={Row} controlId="imageWidth">
                    <Form.Label>
                      {sizeType === '%' ? 'Proportion: ' : 'Width:'}
                    </Form.Label>
                    <Col sm="auto">
                      <EditArticleForm.Control
                        type="text"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                ) : null}
                {sizeType === 'px' ? (
                  <Form.Group as={Row} controlId="imageHeigth">
                    <Form.Label>{'Height:'}</Form.Label>
                    <Col sm="auto">
                      <EditArticleForm.Control
                        type="text"
                        value={height}
                        disabled={sizeType !== 'px'}
                        onChange={e => setHeight(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                ) : null}
              </Col>

              <Col sm="auto"></Col>
            </Row>
          )}
        </fieldset>
      </EditArticleForm.Group>
    </>
  );
};

export default ImageSelector;

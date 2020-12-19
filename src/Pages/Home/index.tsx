import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import qs from 'qs';
import api from '../../services/api';

import {
  HomeContainer,
  HomeCard,
  HomeJumbotron,
  HomeRow,
  HomeCol,
  AdContainer,
  HomeBadge,
} from './styles';

import { Col, Container, Row } from 'react-bootstrap';

import CustomPagination from '../../Components/CustomPagination';
import SearchForm from '../../Components/SearchForm';
import CategorySelector from '../../Components/CategorySelector';
import Footer from '../../Components/Footer';

interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  markdownArticle: string;
  // createdAt: string;
  date: string;
  category: string;
  previewImg: string;
}

interface Search {
  searchText: string;
  typing: boolean;
  typingTimeout: number;
}

interface Query {
  search: string;
  category: string;
}

const Home: React.FC = () => {
  let location: any = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<Search>({
    searchText: String(
      qs.parse(location.search, { ignoreQueryPrefix: true })?.search || '',
    ),
    typing: false,
    typingTimeout: 0,
  });
  const [query, setQuery] = useState<Query>({
    search: String(
      qs.parse(location.search, { ignoreQueryPrefix: true })?.search || '',
    ),
    category: String(
      qs.parse(location.search, { ignoreQueryPrefix: true })?.category || '',
    ),
  });

  console.log('query', query);

  const generateQueryString = (query: Query): string => {
    return `/${
      query?.search || query?.category
        ? `?${Object.entries(query).reduce((acummulator, entry) => {
            if (!entry[0] || !entry[1]) return acummulator;
            return (
              acummulator + `${acummulator ? '&' : ''}${entry[0]}=${entry[1]}`
            );
          }, '')}`
        : ''
    }`;
  };

  window.history.replaceState(null, '', generateQueryString(query));

  useEffect(() => {
    api
      .get(`api/articles${generateQueryString(query)}`)
      .then(res => setArticles(res.data.articles));
  }, [query]);

  // useEffect(() => {
  //   api
  //     .get(`api/articles?${searchText ? `search=${searchText}` : ''}`)
  //     .then((response: AxiosResponse) => {
  //       setArticles(response.data.articles);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (search.typingTimeout) {
      clearTimeout(search.typingTimeout);
    }

    const searchText = e.target.value;

    setSearch({
      searchText,
      typing: true,
      typingTimeout: setTimeout(() => {
        setQuery({ ...query, search: searchText });

        setSearch({
          searchText,
          typing: false,
          typingTimeout: 0,
        });
      }, 1000),
    });
    // setSearchText(e.target.value);
  };

  const handlePaginate = (value: number) => {
    setPage(value);
  };

  const indexOfLastPost = page * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <HomeJumbotron fluid>
        <h1>Encontre investimentos em que você acredita!</h1>
      </HomeJumbotron>
      <Container style={{ border: 0, padding: 0 }} fluid>
        <Row>
          <Col>
            <SearchForm
              onChange={handleSearchInput}
              value={search.searchText}
            />
            {search.typing ? <p>Buscando...</p> : null}
          </Col>
          <Col md="auto">
            <CategorySelector
              onClick={category => {
                setQuery({ ...query, category: category });
              }}
              category={query.category}
              searchQueryMode={true}
            />
          </Col>
        </Row>
      </Container>

      <AdContainer />
      <HomeContainer>
        <HomeRow>
          {currentPosts.length > 0 ? (
            currentPosts.map(article => (
              <HomeCol key={article._id} sm={6}>
                <Link to={'/view/' + article.slug}>
                  <HomeCard className="text-center" types={article.category}>
                    {article.category ? (
                      <HomeCard.Header>
                        <h4>
                          <HomeBadge pill variant="light">
                            {article.category}
                          </HomeBadge>
                        </h4>
                      </HomeCard.Header>
                    ) : (
                      ''
                    )}
                    {article.previewImg ? (
                      <>
                        <HomeCard.Img
                          src={article.previewImg}
                          alt={article.title}
                        />
                        <HomeCard.ImgOverlay>
                          <HomeCard.Body>
                            <HomeCard.Title>{article.title}</HomeCard.Title>
                            <HomeCard.Text>{article.description}</HomeCard.Text>
                          </HomeCard.Body>
                        </HomeCard.ImgOverlay>
                      </>
                    ) : (
                      <>
                        <HomeCard.Body>
                          <HomeCard.Title>{article.title}</HomeCard.Title>
                          <HomeCard.Text>{article.description}</HomeCard.Text>
                        </HomeCard.Body>
                      </>
                    )}

                    <HomeCard.Footer>
                      {new Date(article.date).toLocaleString()}
                    </HomeCard.Footer>
                  </HomeCard>
                </Link>
              </HomeCol>
            ))
          ) : (
            <HomeCol>
              <h1>Não encontramos nenhum artigo.</h1>
            </HomeCol>
          )}
        </HomeRow>
        <CustomPagination
          totalPosts={articles.length}
          paginate={handlePaginate}
        />
      </HomeContainer>
      <Footer />
    </>
  );
};

export default withRouter(Home);

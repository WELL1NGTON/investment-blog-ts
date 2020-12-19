import React, { useEffect, useState } from 'react';
import { StyledDropdownButton, StyledDropdown } from './styles';
import api from '../../services/api';

const DEFAULT_COLOR = '#FFFFFF';

export interface Category {
  value: string;
  name: string;
  color: string;
}

interface CategorySelectorProps {
  onClick: (category: string) => void;
  category: string;
  searchQueryMode: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onClick,
  category,
  searchQueryMode,
}: CategorySelectorProps) => {
  const [categories, setCategories] = useState<Category[]>(
    searchQueryMode
      ? [
          {
            value: '',
            name: 'TODOS',
            color: DEFAULT_COLOR,
          },
        ]
      : [],
  );
  const [selected, setSelected] = useState<Category>(
    searchQueryMode
      ? {
          value: '',
          name: 'TODOS',
          color: DEFAULT_COLOR,
        }
      : {
          value: '',
          name: '',
          color: DEFAULT_COLOR,
        },
  );

  useEffect(() => {
    api.get(`api/categories`).then(res => {
      let newCategories = [...categories];

      newCategories = newCategories.concat(
        res.data.categories.map(
          (element: {
            color: string;
            visible: boolean;
            name: string;
            _id: string;
          }) => {
            return {
              value: element.name,
              name: element.name,
              color: element.color,
            } as Category;
          },
        ),
      );

      if (searchQueryMode) {
        newCategories.forEach(element => {
          if (element.value === category) setSelected(element);
        });
      } else {
        if (category) {
          newCategories.forEach(element => {
            if (element.value === category) setSelected(element);
          });
        } else {
          onClick(newCategories[0].value);
          setSelected(newCategories[0]);
        }
      }
      setCategories(newCategories);
    });
  }, []);

  return (
    <>
      {
        <StyledDropdownButton
          title={selected.name}
          style={{ backgroundColor: selected.color }}
        >
          {categories.map(element => {
            return (
              <StyledDropdown.Item
                key={element.value}
                as="button"
                style={{ backgroundColor: element.color }}
                value={element.value}
                type="button"
                onClick={e => {
                  setSelected(element);
                  onClick(element.value);
                }}
              >
                {element.name}
              </StyledDropdown.Item>
            );
          })}
        </StyledDropdownButton>
      }
    </>
  );
};

export default CategorySelector;

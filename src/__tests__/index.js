import { MarkdownPreview } from '../index';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

const { describe, it } = global;

describe('MarkdownPreview', () => {
  it('should display markdown', () => {
    const text = '# Title';
    /* eslint-disable react/jsx-filename-extension */
    const wrapper = shallow(<MarkdownPreview value={text} />);
    expect(wrapper.html()).to.be.equal('<div><h1>Title</h1>\n</div>');
  });
});

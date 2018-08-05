'use strict';

const assert = require('assert');
const Image = require('../src/image');

describe('Image', () => {
  let image = new Image('😱', 'http://example.com', 'some_image', 'some_image_signature');

  describe('#getKey()', () => {
    it('should return a key', () => {
      assert.equal(image.getKey(), '😱');
    });
  });

  describe('#toString()', () => {
    it('should return a URL', () => {
      assert.equal(image.toString(), 'http://example.com');
    });
  });

  describe('#getImage()', () => {
    it('should return an image', () => {
      assert.equal(image.getImage(), 'some_image');
    });
  });

  describe('#getAuthor()', () => {
    it('should return an image signature', () => {
      assert.equal(image.toString(), 'some_image_signature');
    });
  });
});

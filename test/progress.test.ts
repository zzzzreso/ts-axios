import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should add a download progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', { onDownloadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  it('should add a upload progress handler', () => {
    const progressSpy = jasmine.createSpy('progress')

    axios('/foo', { onUploadProgress: progressSpy })

    return getAjaxRequest().then(request => {
      // Jasmine AJAX doesn't trigger upload events. Waiting for upstream fix
      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
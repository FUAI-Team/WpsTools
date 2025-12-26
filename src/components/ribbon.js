import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI) {
  if (typeof window.Application.ribbonUI != 'object') {
    window.Application.ribbonUI = ribbonUI
  }

  if (typeof window.Application.Enum != 'object') {
    // 如果没有内置枚举值
    window.Application.Enum = Util.WPS_Enum
  }

  //这几个导出函数是给外部业务系统调用的
  window.openOfficeFileFromSystemDemo = SystemDemo.openOfficeFileFromSystemDemo
  window.InvokeFromSystemDemo = SystemDemo.InvokeFromSystemDemo

  return true
}

var WebNotifycount = 0
function OnAction(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnShowTaskPane':
      {
        let tsId = window.Application.PluginStorage.getItem('taskpane_id')
        if (!tsId) {
          let tskpane = window.Application.CreateTaskPane('http://172.16.167.83:3000/')
          let id = tskpane.ID
          window.Application.PluginStorage.setItem('taskpane_id', id)
          tskpane.Visible = true
        } else {
          let tskpane = window.Application.GetTaskPane(tsId)
          tskpane.Visible = !tskpane.Visible
        }
      }
      break
    default:
      break
  }
  return true
}

function GetImage(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnShowTaskPane':
      return 'images/doc_sense_logo.svg'
    default:
  }
  return 'images/doc_sense_logo.svg'
}

function OnGetEnabled(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnShowTaskPane': {
      return true
    }
    default:
      break
  }
  return true
}

function OnGetVisible(control) {
  const eleId = control.Id
  console.log(eleId)
  return true
}

function OnGetLabel(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnIsEnbable': {
      let bFlag = window.Application.PluginStorage.getItem('EnableFlag')
      return bFlag ? '按钮Disable' : '按钮Enable'
    }
    case 'btnApiEvent': {
      let bFlag = window.Application.PluginStorage.getItem('ApiEventFlag')
      return bFlag ? '清除新建文件事件' : '注册新建文件事件'
    }
  }
  return ''
}

function OnNewDocumentApiEvent(doc) {
  alert('新建文件事件响应，取文件名: ' + doc.Name)
}

//这些函数是给wps客户端调用的
export default {
  OnAddinLoad,
  OnAction,
  GetImage,
  OnGetEnabled,
  OnGetVisible,
  OnGetLabel,
  OnNewDocumentApiEvent
}

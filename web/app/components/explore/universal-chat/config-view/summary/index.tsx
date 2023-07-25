'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import { useBoolean, useClickAway } from 'ahooks'
import s from './style.module.css'
import ModelIcon from '@/app/components/app/configuration/config-model/model-icon'
import { Google, WebReader, Wikipedia } from '@/app/components/base/icons/src/public/plugins'
import ConfigDetail from '@/app/components/explore/universal-chat/config-view/detail'

export type ISummaryProps = {
  modelId: string
  plugins: Record<string, boolean>
  dataSets: any[]
}

const getColorInfo = (modelId: string) => {
  if (modelId === 'gpt-4')
    return 'bg-[#EBE9FE] border-[#F4F3FF]'

  if (modelId === 'claude-2')
    return 'bg-[#F9EBDF] border-[#FCF3EB]'

  return 'bg-[#D3F8DF] border-[#EDFCF2]'
}

const getPlugIcon = (pluginId: string) => {
  const className = 'w-4 h-4'
  switch (pluginId) {
    case 'google_search':
      return <Google className={className} />
    case 'web_reader':
      return <WebReader className={className} />
    case 'wikipedia':
      return <Wikipedia className={className} />
    default:
      return null
  }
}

const Summary: FC<ISummaryProps> = ({
  modelId,
  plugins,
  dataSets,
}) => {
  const pluginIds = Object.keys(plugins).filter(key => plugins[key])
  const [isShowConfig, { setFalse: hideConfig, toggle: toggleShowConfig }] = useBoolean(false)
  const configContentRef = React.useRef(null)

  useClickAway(() => {
    hideConfig()
  }, configContentRef)
  return (
    <div ref={configContentRef} className='relative'>
      <div onClick={toggleShowConfig} className={cn(getColorInfo(modelId), 'flex items-center px-1 h-8 rounded-lg border cursor-pointer')}>
        <ModelIcon modelId={modelId} className='!w-6 !h-6' />
        <div className='ml-2 text-[13px] font-medium text-gray-900'>{modelId}</div>
        {
          pluginIds.length > 0 && (
            <div className='ml-1.5 flex items-center'>
              <div className='mr-1 h-3 w-[1px] bg-[#000] opacity-[0.05]'></div>
              <div className='flex space-x-1'>
                {pluginIds.map(pluginId => (
                  <div
                    key={pluginId}
                    className={`flex items-center justify-center w-6 h-6 rounded-md ${s.border} bg-white`}
                  >
                    {getPlugIcon(pluginId)}</div>
                ))}
              </div>
            </div>
          )
        }
      </div>
      {isShowConfig && (
        <ConfigDetail
          modelId={modelId} plugins={plugins} dataSets={dataSets}
        />
      )}
    </div>

  )
}
export default React.memo(Summary)

import React, { useMemo, useState } from 'react'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'
import { CodeEditor } from '@harnessio/yaml-editor'
import { themes } from '../assets/monacoTheme'
import { Sidebar } from './sandbox-repo-code-page'
import * as monaco from 'monaco-editor'

const blameBlocks = {
  '1': {
    fromLineNumber: 1,
    toLineNumber: 16,
    commitInfo: {
      sha: 'abdc1bd416ccf1fd03c32a12a403ea8de0a84cf0',
      title: 'Initial commit of working core and sample for Zuul 2.0',
      author: {
        identity: {
          name: 'agonigberg',
          email: 'agonigberg@netflix.com'
        },
        when: '2017-11-22T08:19:09+07:00'
      }
    }
  },
  '17': {
    fromLineNumber: 17,
    toLineNumber: 35,
    commitInfo: {
      sha: 'c9e7ec91a9ba641e6ea3c503917d65640a1e5f0a',
      title: '* Convert FilterLoader to be injectable...',
      author: {
        identity: {
          name: 'Justin Ryan',
          email: 'jryan@netflix.com'
        },
        when: '2017-08-31T14:35:37+07:00'
      }
    }
  },
  '36': {
    fromLineNumber: 36,
    toLineNumber: 37,
    commitInfo: {
      sha: 'b28109c26b80c3ea2de323866330a2f54ce32b1a',
      title: 'zuul-core: fix generics on Filter loaders',
      author: {
        identity: {
          name: 'Carl Mastrangelo',
          email: 'carl-mastrangelo@users.noreply.github.com'
        },
        when: '2020-03-07T04:27:52+07:00'
      }
    }
  },
  '38': {
    fromLineNumber: 38,
    toLineNumber: 39,
    commitInfo: {
      sha: 'c9e7ec91a9ba641e6ea3c503917d65640a1e5f0a',
      title: '* Convert FilterLoader to be injectable...',
      author: {
        identity: {
          name: 'Justin Ryan',
          email: 'jryan@netflix.com'
        },
        when: '2017-08-31T14:35:37+07:00'
      }
    }
  }
}

const codeContent = `/*
 * Copyright 2018 Netflix, Inc.
 *
 *      Licensed under the Apache License, Version 2.0...
 */

package com.netflix.zuul.guice;

import com.google.inject.Injector;
import com.netflix.zuul.FilterFactory;
import com.netflix.zuul.filters.ZuulFilter;
import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class GuiceFilterFactory implements FilterFactory {

    private final Injector injector;

    @Inject
    public GuiceFilterFactory(Injector injector) {
        this.injector = injector;
    }

    @Override
    public ZuulFilter<?, ?> newInstance(Class<?> clazz) throws Exception {
        return injector.getInstance(clazz.asSubclass(ZuulFilter.class));
    }
}
`

function SandboxRepoCodeBlamePage() {
  const [loadState, setLoadState] = useState('full-sub')

  const themeConfig = useMemo(
    () => ({
      defaultTheme: 'dark',
      themes
    }),
    []
  )

  const decorations = Object.values(blameBlocks).map(block => ({
    range: new monaco.Range(block.fromLineNumber, 1, block.fromLineNumber, 1),
    options: {
      isWholeLine: true,
      marginClassName: 'git-blame-margin',
      after: {
        contentText: `${block.commitInfo.author.identity.name} - ${block.commitInfo.title}`,
        inlineClassName: 'blame-inline-text'
      }
    }
  }))

  console.log(decorations)

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader hasSubHeader>
          <SandboxLayout.Content>
            <Sidebar />
          </SandboxLayout.Content>
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Main
        fullWidth={loadState.includes('full')}
        hasLeftPanel
        hasLeftSubPanel={loadState.includes('sub')}
        hasHeader
        hasSubHeader>
        <SandboxLayout.Content>
          <CodeEditor
            language="java"
            codeRevision={{ code: codeContent }}
            onCodeRevisionChange={() => {}}
            themeConfig={themeConfig}
            options={{
              readOnly: true
            }}
          />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxRepoCodeBlamePage }

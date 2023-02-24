#!/usr/bin/env python3
#Import open AI OS and System Modules
import openai,os,sys
prompt = 'Dame 5 de los campeones de lol mas pickeados de los pro, y con un resumen de sus habilidades'
openai.api_key = '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'
completions = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
)
message = completions.choices[0].text
print(message)
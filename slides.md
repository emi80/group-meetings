# Blueprint pipeline


## Blueprint pipeline
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> RNAseq pipeline written in Bash</div>
<!-- .element: style="margin-bottom: 2em;"-->

- mapping (GEMtools)
- bigwig
- contig
- quantification (Flux Capacitor)
- BAM statistics (RSeQC)


## Bash
<!-- .element: class="green"-->

```bash
#!/bin/bash
```

- widely supported on any Linux platform
<!-- .element: style="margin-top: 2em"-->
- most bioinformaticians are used to it


## SGE options
<!-- .element: class="green" style="margin-bottom: 0.6em;"-->

```bash
# Force bash shell
#$ -S /bin/bash
#
# Export environment variables
#$ -V
#
# Use current working directory as job working directory
#$ -cwd
#
# Rename stdout and stderr files
#$ -o $JOB_NAME.out
#$ -e $JOB_NAME.err
```
<!-- .element: style="margin-top: 3em"-->
<div class="panel panel-default">
Queue, memory and time **must** be specified when submitting the job.
</div>


## Modular execution
<!-- .element: class="green" style="margin-bottom: 0.6em;"-->

```
# getting pipeline steps to be executed
steps=(mapping bigwig contig flux)

if [[ "$@" ]]; then
    read -ra steps <<< "$@"
fi

for step in ${steps[@]}; do
    case $step in
        mapping)
            doMapping="true"
            ;;
        bigwig)
            doBigWig="true"
            ;;
        contig)
            doContig="true"
            ;;
        quant|flux)
            doFlux="true"
            ;;
    esac
done
```

Run specific steps:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```bash
blueprint.pipeline.sh ... -- contig flux
```


## Monolitic pipeline
<!-- .element: class="red" style="margin-bottom: 0.6em;"-->

- pipeline steps are executed sequencially
- one cluster node per run is used <span class="red"> <i class="fa fa-arrow-right"></i> weak parallelization</span>
- bad resource management - not all steps use the same amount of cpus/memory


## Batch execution
<!-- .element: class="red" style="margin-bottom: 0.6em;"-->

Some extra code required:
<!-- .element: style="text-align: left; margin-left: 1.5em"-->

```bash
#!/bin/bash

base="/users/rg/epalumbo/projects/BluePrint"
threads="8"
vmem="64G"
fluxMem=$((${vmem:0:$((${#vmem}-1))}/2))${vmem:$((${#vmem}-1)):1}
rtime="72:00:00"
do=${1-"echo"}

while read lab id path strand sex; do
    quality="33"
    genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.chr.fa"
    annotation="$base/annotation/gencode.v15.annotation.gtf"
    if [[ $sex == 'Female' ]]; then
        genome="$base/genome/Homo_sapiens.GRCh37.chromosomes.female.chr.fa"
        annotation="$base/annotation/gencode.v15.annotation.female.gtf"
    fi
    sample=`echo $id | cut -d"_" -f1`
    readGroup="ID=$id,PL=ILLUMINA,PU=$id,LB=Blueprint,SM=$sample,DT=`date +"%Y-%m-%dT%H:%M:%S%z"`,CN=$lab,DS=Blueprint"
    command="qsub -pe smp $threads -l virtual_free=$vmem,h_rt=$rtime -q rg-el6,long -N $id.pipeline"
    command=$command" ../blueprint.pipeline.sh -i `basename $path` -g $genome -a $annotation -q $quality -t $threads --paired --read-group $readGroup -r 150 --read-strand ${strand^^} --flux-mem $fluxMem"

    if [ ! -d $id ]; then
        $do "mkdir $id"
        $do "ln -s $path $id"
        $do "ln -s ${path//_1/_2} $id"
    fi
    $do "cd $id"
    $do "$command"
    $do "cd ..""
done
```


## Data management
<!-- .element: class="red" style="margin-bottom: 0.6em;"-->

User has to keep metadata and file information:
<!-- .element: style="margin-bottom: 1em;"-->

- tsv/csv files
- Google spreadsheets
- Index files

------

# Idxtools
<a href="//github.com/emi80/idxtools"><h3><i class="fa fa-github-square"> github.com/emi80/idxtools</i></h3></a>


## Index files
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Plain text database files to store metadata information for files and their content</div>


## Format
<!-- .element: style="margin-bottom: 1em;"-->

```markdown
<filepath>TAB<attributes_list>
```

<!-- .element: style="margin-bottom: 1em; margin-top: 3em;"-->
with `attribute_list` as a semicolon separated list of `key=value` strings:

```markdown
/path/to/file    size=100; id=1; class=MyClass; type=MyType
```


## Idxtools
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Python API and commandline tool to **create**, **query** and **modify** index files</div>


## Dataset
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i><span class="blue"> Dataset</span> is the main data object</div>
<!-- .element: style="margin-bottom: 1em;"-->

Metadata:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```markdown
.   id=test1; quality=33; sex=female;
```

Files:
<!-- .element: style="margin-top: 1em; text-align: left; margin-left: 1.5em;"-->
```markdown
/data/test1_1.fastq.gz id=test1; quality=33; sex=female; type=fastq; view=FqRd1;
/data/test1.bam id=test1; quality=33; sex=female; type=bam; view=Alignments;
```


## Format.json
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Specifies the syntax and vocabulary of an index file</div>
<!-- .element: style="margin-bottom: 1em;"-->

```json
{
  "colsep": "\t",
  "id": "labExpId",
  "kw_sep": " ",
  "sep": "=",
  "trail": ";",
  "fileinfo": [
    "path",
    "size",
    "md5",
    "type",
    "view"
  ]
}
```


## Mapping attribute keys
<!-- .element: style="margin-bottom: 0.6em;"-->

Useful when importing from csv/tsv:
<!-- .element: style="margin-bottom: 1em; text-align: left; margin-left: 1.5em"-->

```json
{
  "colsep": "\t",
  "sep": "=",
  "trail": ";",
  "kw_sep": " ",
  "id": "labExpId",
  "fileinfo": [
    "path",
    "size",
    "md5",
    "type",
    "view",
    "submittedDataVersion"
  ],
  "map": {
    "BASE_COUNT": "baseCount",
    "BIOMATERIAL_PROVIDER": "",
    "BIOMATERIAL_TYPE": "localization",
    "CELL_TYPE": "cell",
    "CENTER_NAME": "lab",
    "DISEASE": "",
    "DONOR_AGE": "age",
    "DONOR_ETHNICITY": "ethnicity",
    "DONOR_HEALTH_STATUS": "",
    "DONOR_ID": "donorId",
    "DONOR_REGION_OF_RESIDENCE": "",
    "DONOR_SEX": "sex",
    "EXPERIMENT_ID": "",
    "EXPERIMENT_TYPE": "",
    "_FILE": "path",
    "FILE_MD5": "md5",
    "FILE_SIZE": "size",
    "FIRST_SUBMISSION_DATE": "dateSubmittedFirst",
    "INSTRUMENT_MODEL": "",
    "INSTRUMENT_PLATFORM": "seqPlatform",
    "LIBRARY_LAYOUT": "",
    "LIBRARY_NAME": "libProtocol",
    "LIBRARY_STRATEGY": "dataType",
    "MOLECULE": "rnaExtract",
    "READ_COUNT": "readCount",
    "READ_TYPE": "readType",
    "READ_QUALITIES": "quality",
    "READ_STRAND": "readStrand",
    "RUN_ID": "labExpId",
    "RUN_NAME": "",
    "SAMPLE_ID": "sraSampleAccession",
    "SAMPLE_NAME": "labProtocolId",
    "SEQ_RUNS_COUNT": "seqRun",
    "SPECIMEN_PROCESSING": "",
    "SPECIMEN_STORAGE": "",
    "STUDY_ID": "sraStudyAccession",
    "STUDY_NAME": "",
    "SUBMISSION_DATE": "dateSubmitted",
    "SUBMISSION_ID": "",
    "TISSUE": "tissue",
    "TWIN_PAIR_ID": "",
    "TYPE": "type",
    "WITHDRAWN": ""
  }
}
```


## Specifying index and format files
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Index and format files can be specified as <span class="blue">command line options</span> or as <span class="blue">environment variables</span></div>
<!-- .element: style="margin-bottom: 1.4em;"-->

```bash
# command line
$ idxtools -i index.txt -f format.json [command]

# environment variables
export IDX_FILE=/path/to/index.txt
export IDX_FORMAT=/path/to/format.json

$ idxtools show
```
<div class="panel panel-default">Using absolute paths to make the index available from any folder</div>
<!-- .element: style="margin-top: 1em;"-->


## Importing TSV/CSV
<!-- .element: style="margin-bottom: 0.6em;"-->

A CSV file, `test.csv`:

```markdown
path,labExpId,quality,sex,type,view
/data/test1_1.fastq.gz,test1,33,female,fastq,FqRd1
/data/test1_2.fastq.gz,test1,33,female,fastq,FqRd2
/data/test2_1.fastq.gz,test2,64,male,fastq,FqRd1
/data/test2_2.fastq.gz,test2,64,male,fastq,FqRd2
/data/test2.bam,test2,64,male,bam,Alignments
```

<!-- .element: style="margin-top: 1em; text-align: left; margin-left:1.5em;"-->
```bash
# import csv and show
$ export IDX_FORMAT=$PWD/format.json
$ idxtools -i test.csv show
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

# import csv and save to file
$ idxtools -i test.csv -f format.json show -o index.txt
$ export IDX_FILE=$PWD/index.txt
```


## Querying the index
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
# query by attributes
$ idxtools show id=test2
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

$ idxtools show view=FqRd1
./data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
./data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;

$ idxtools show type=bam
./data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;
```


## Querying the index
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
# queries use regular expressions
# query by id starting with t
$ idxtools show id=t # equivalent to: idxtools show id="^t"
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

# exact queries
$ idxtools show id=t --exact

# operations on numeric attributes
$ idxtools show quality=">40"
/data/test2_1.fastq.gz labExpId=test2; type=fastq; view=FqRd1; quality=64; sex=male;
/data/test2_2.fastq.gz labExpId=test2; type=fastq; view=FqRd2; quality=64; sex=male;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;
$ idxtools show quality="<40"
/data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
/data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
```


## Query output
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> The default output format is the <span class="blue">index file format</span> but it can be changed to TSV with the `-t` option</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# TSV output - single attribute
$ idxtools show view=FqRd1 -t path
/data/test1_1.fastq.gz
/data/test2_1.fastq.gz

# TSV output - multiple attributes
$ idxtools show view=FqRd1 -t id,path
test1   ./data/test1_1.fastq.gz
test2   ./data/test2_1.fastq.gz

# with header
$ idxtools show view=FqRd1 -t id,path --header
id  path
test1   ./data/test1_1.fastq.gz
test2   ./data/test2_1.fastq.gz

```
<!-- .element: style="margin-top: 1em;"-->
<div class="panel panel-default">attribute names <i class="fa fa-arrow-right"></i> comma separated list with <strong>NO</strong> space</div>


## Adding files
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Files can be easily added to the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# add /data/test1.bam
$ idxtools add path=/data/test1.bam id=test1 type=bam view=Alignments

# check
$ idxtools show type=bam
/data/test1.bam    labExpId=test1; type=bam; view=Alignments; quality=33; sex=female;
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

```


## Removing files
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Files can be easily removed from the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# remove /data/test1.bam
$ idxtools remove /data/test1.bam

# check
$ idxtools show type=bam
/data/test2.bam    labExpId=test2; type=bam; view=Alignments; quality=64; sex=male;

```


## Removing datasets
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Datasets can also be removed from the index</div>
<!-- .element: style="margin-bottom: 1em;"-->

```bash
# remove test2
$ idxtools remove id=test2

# check
$ idxtools show
./data/test1_1.fastq.gz labExpId=test1; type=fastq; view=FqRd1; quality=33; sex=female;
./data/test1_2.fastq.gz labExpId=test1; type=fastq; view=FqRd2; quality=33; sex=female;
```
------

# JIP
<a href="//pyjip.readthedocs.org"><h3><i class="fa fa-external-link-square"> pyjip.readthedocs.org</i></h3></a>


## JIP
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> A pipeline system that helps to manage large numbers of jobs on a compute cluster</div>
<!-- .element: style="margin-bottom: 2em;"-->

- dependency support
- automatic expansions
- simplified management of jobs and resources


## Tools
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> The smallest unit of execution in JIP is a `tool`. </div>
<!-- .element: style="margin-bottom: 2em;"-->

Tools can be implemented in various ways:

- JIP scritps
- Python APIs

<div class="panel panel-default" style="margin-top: 2em;">
Tools can be combined to pipelines to build bigger workflows.
</div>


## Configuration
<!-- .element: style="margin-bottom: 0.6em;"-->
```json
{
    "cluster": "jip.cluster.SGE",
    "sge" : {
        "threads_pe": "smp",
        "time_limit": "h_rt"
    },
    "profiles": {
        "default": {
            "queue": "short,long,rg-el6",
            "time": "3h"
        },

        "long": {
            "queue": "long,rg-el6",
            "time": "24h",
            "mem": "64G"
        },
        "short": {
            "queue": "short",
            "time": "6h",
            "mem": "16G"
        }
    }
}

```


## Run or submit commands
<!-- .element: style="margin-bottom: 0.6em;"-->

The `jip bash` command:

```bash
# run `hostname` locally
$ jip bash -c hostname

# submit
$ jip bash -s -c hostname
```
<!-- .element: style="margin-bottom: 3em;"-->

Check jobs with `jip jobs`:

```bash
# check the status of the job
$ jip jobs
```


## Scripts
<!-- .element: style="margin-bottom: 0.6em;"-->

JIP scripts are extended Bash scripts:
<!-- .element: style="text-align: left; margin-left: 1.5em;"-->

```bash
    #!/usr/bin/env jip
    # Greetings
    # usage:
    #     hello.jip <name>

    echo "Hello ${name}"
```
<!-- .element: style="margin-bottom: 3em;"-->

Make the file executable and you can use the JIP interpreter to run it or
submit it:
<!-- .element: style="text-align: left; margin-left: 1.5em;"-->

```bash
    $ chmod +x hello.jip
    # run the script
    $ ./hello.jip Joe
    # show dry run and command only
    $ ./hello.jip Joe -- --dry --show
    # submit the script run
    $ ./hello.jip Joe -- submit
```


## Tools path
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i>
Scripts can be found automatically in your **current folder** or by **setting** the `JIP_PATH` environment variable. Use the `jip tools` command to list all the detected tools.</div>
<!-- .element: style="margin-bottom: 2em;"-->

```bash
    $> export JIP_PATH=$PWD
    $> jip tools
    ...
            Name                                            Path
    ======================================================================================
    hello.jip                                 /users/rg/epalumbo/jip/hello.jip
    ...
```


## Example tool
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
#!/bin/env jip
# Sort fastq file by read id
#
# Usage:
#   fastq-sort.jip [-i <fastq>] [-o <sorted_fastq>]
#
# Inputs:
#   -i, --input <input>   Input fastq [default: stdin]
#
# Outputs:
#   -o, --output <output>  Output sorted fastq [default: stdout]
#

${input|arg("cat ")|suf(" | ")}paste - - - - | sort -k1,1 | tr '\t' '\n' ${output|arg(">")}
```


## Example tool with logic
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
#!/bin/env jip
# Run pigz on an input file
#
# Usage:
#   pigz.jip [-i <INPUT>] [-d] [-o <OUTPUT>]
#
# Inputs:
#   -i, --input <INPUT>  The input file [default: stdin]
#
# Outputs:
#   -o, --output <OUTPUT>  The output file [default: stdout]
#
# Options:
#   -d, --decompress  Decompress data

#%begin setup
add_option('stdout', False, hidden=False, short='-c')
if input.get():
    if opts['input'].raw().endswith('gz'):
        opts['decompress'] = True
    else:
        opts['decompress'] = False
if not output.get():
    opts['stdout'] = True
else:
    if output.get() == '${input}.gz' or output.get().replace('.gz','') == input.get():
        opts['output'].hidden = True
#%end

pigz -p ${JIP_THREADS} ${stdout|arg} ${decompress|arg} ${input|arg("")} ${output|arg(">")}

```


## Example pipeline
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
#!/bin/env jip
#
# Sort and compress fastq
#
# Usage:
#   fq-pipe [-i <INPUT>] [-o <OUTPUT>]
#
# Inputs:
#   -i, --input <INPUT>  Input file [default: stdin]
#
# Outputs:
#   -o, --output <OUTPUT>  Output file [default: stdout]
#

#%begin pipeline
decomp_input = input
if type(input.raw()) == unicode and input.raw().endswith('gz'):
    decomp_input = job(temp=True).run('pigz', input=decomp_input)
sorted_fastq = job(temp=True).run('fastq-sort', input=decomp_input)
run('pigz', input=sorted_fastq, output=output)
#%end
```


## Multiplexing
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i>
Automatic expansion of wildcard for multiple input files. The tool/pipeline will be replicated across all input files.</div>
<!-- .element: style="margin-bottom: 2em;"-->

```bash
$ ./sort_fastq.jip -i *_1.fastq -- --dry --show
...
#####################
|  Job hierarchy    |
#####################
sort_fastq.0
sort_fastq.1
#####################
| Tasks:         2  |
| Jobs:          2  |
| Named Groups:  1  |
| Job Groups:    2  |
#####################

Job commands
============
### sort_fastq.0 -- Interpreter: bash
###   stdout: <default>
###   stderr: <default>
cat /home/epalumbo/testA_1.fastq | paste - - - - | sort -k1,1 | tr '\t' '\n' >/home/epalumbo/testA_1_sorted.fastq
###
### sort_fastq.1 -- Interpreter: bash
###   stdout: <default>
###   stderr: <default>
cat /home/epalumbo/testB_1.fastq | paste - - - - | sort -k1,1 | tr '\t' '\n' >/home/epalumbo/testB_1_sorted.fastq
###

```
------

# Nextflow
#### Data-driven computational pipelines
<a href="//www.nextflow.io"><h3><i class="fa fa-external-link-square"> www.nextflow.io</i></h3></a>


## Nexflow
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> A fluent DSL modelled around the UNIX pipe concept, that simplifies writing parallel and scalable pipelines in a portable manner.</div>
<!-- .element: style="margin-bottom: 2em;"-->

- unified parallelism
- continuous checkpoints
- fast prototyping
- reproducibility


## Processes and channels
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> A Nextflow pipeline script is made by different isolated processes joined by asynchronous FIFO queues, called `channels`.</div>

<div class="panel panel-default">The pipeline execution flow is implicitly defined by the input and output channels declarations.</div>
<!-- .element: style="margin-top: 2em;"-->


## Configuration
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i>
Pipeline configuration properties are defined in a file named `nextflow.config` in the pipeline execution directory. </div>
<!-- .element: style="margin-bottom: 2em;"-->

```java
// sample configuration
process {
    executor = 'sge'
    queue = 'rg-el6'
}

env {
    PATH="$PWD/gemtools-1.6.2-i3/bin:$PWD/flux-capacitor-1.2.4/bin:$PATH"
}
```


## Scripts
<!-- .element: style="margin-bottom: 0.6em;"-->

Nextflow scripts are extended Groovy scripts:
<!-- .element: style="text-align: left; margin-left: 1.5em;"-->

```java
#!/usr/bin/env nextflow

str = Channel.from('hello', 'hola', 'bonjour', 'ciao')

process printHello {

   input:
   val str

   output:
   stdout into result

   """
   echo $str
   """
}

result.subscribe { print it }
```


## Run a script
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
$ chmod +x hello.nf
$ ./hello.nf
N E X T F L O W  ~  version 0.8.2
[warm up] executor > local
[5a/d7e7d3] Submitted process > printHello (2)
[42/e78174] Submitted process > printHello (1)
[c3/88c277] Submitted process > printHello (4)
[7c/55887c] Submitted process > printHello (3)
bonjour
hola
ciao
hello
```


## Example pipeline
<!-- .element: style="margin-bottom: 0.6em;"-->

```java
#!/usr/bin/env nextflow

/*
 * Pipeline parameters that can be ovverridden by the command line parameter
 */
params.query = "$HOME/*.fa"
params.db = "$HOME/tools/blast-db/pdb/pdb"
params.out = "./result.txt"
params.chunkSize = 100

db = file(params.db)
fasta = Channel
            .fromPath(params.query)
            .splitFasta(by: params.chunkSize)

process blast {
    input:
    file 'query.fa' from fasta

    output:
    file 'top_hits'

    """
    blastp -db ${db} -query query.fa -outfmt 6 > blast_result
    cat blast_result | head -n 10 | cut -f 2 > top_hits
    """
}

process extract {
    input:
    file top_hits

    output:
    file 'sequences'

    "blastdbcmd -db ${db} -entry_batch top_hits | head -n 10 > sequences"
}

sequences
    .collectFile(name: params.out)
    .subscribe { println "Result saved at file: $it" }
```
------

# Modules
####Software environment managment
<a href="//modules.sourceforge.net"><h3><i class="fa fa-external-link-square"> modules.sourceforge.net</i></h3></a>


## Modules
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Package for the dynamic modification of a user's environment via modulefiles.</div>
<!-- .element: style="margin-bottom: 2em;"-->

- **loaded** and **unloaded** dynamically and atomically
- all popular shells supported
- language binding for Perl and Python
- managing different versions of applications
- complete suites (metamodules)


## Modules path
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i> Paths of directories containing modulefiles are specified by setting the MODULEPATH environment variable.</div>
<!-- .element: style="margin-bottom: 1em;"-->

<pre><code class="bash">$ echo $MODULEPATH
/software/rg/el6.3/modulefiles:/usr/share/Modules/modulefiles:/etc/modulefiles

# modulefile folder structure
$ tree /software/rg/el6.3/modulefiles
/software/rg/el6.3/modulefiles/
&#9500;&#9472;&#9472; aspera
&#9474;   &#9500;&#9472;&#9472; 3.0.1
&#9474;   &#9492;&#9472;&#9472; 3.3.3
&#9500;&#9472;&#9472; bedtools
&#9474;   &#9500;&#9472;&#9472; 2.17.0
&#9474;   &#9492;&#9472;&#9472; 2.19.1
...
</code></pre>


## Modulefiles
<!-- .element: style="margin-bottom: 0.6em;"-->
<div class="panel panel-default"><i class="fa fa-arrow-circle-right blue"></i>  Contains the information needed to configure the shell for an application.</div>

<!-- .element: style="margin-top: 1em;"-->
```
#%Module1.0
########################################################
#
# Author: Emilio Palumbo (emilio.palumbo@crg.es)
#
########################################################

set PROG_NAME       samtools
set PROG_VERSION    0.1.19
set PROG_HOME       /software/rg/el6.3/$PROG_NAME-$PROG_VERSION

proc ModulesHelp { } {

      puts stderr "$PROG_NAME version $PROG_VERSION"
}

module-whatis "loads the $PROG_NAME $PROG_VERSION module"

module-verbosity {on}

# Tests of consistency
# --------------------
# This application cannot be loaded if another $PROG_NAME modulefile was previously loaded

set namelow [string tolower $PROG_NAME]
conflict $namelow

### This shows info about loaded/unloaded module
if { [module-info mode] != "whatis" } {
   puts stderr "[module-info mode] [module-info name] (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)"
}

prepend-path      PATH                 $PROG_HOME/bin
prepend-path      MANPATH              $PROG_HOME/man
prepend-path      LD_LIBRARY_PATH      $PROG_HOME/lib
prepend-path      C_INCLUDE_PATH       $PROG_HOME/include
```


## Available modules
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- .element: style="margin-top: 1em;"-->
    $ module avail
    ------------------------ /software/rg/el6.3/modulefiles ------------------------
    aspera/3.0.1(default)              htslib/0.2.0-rc8(default)
    aspera/3.3.3                       ipsa/1.0(default)
    bedtools/2.17.0(default)           ipsa/1.1
    bedtools/2.19.1                    jip-tools/1.0(default)
    bowtie/1.0.1(default)              picard/1.81(default)
    cufflinks/2.0.2                    pigz/2.2.5(default)
    cufflinks/2.1.1                    pigz/2.3.1
    cufflinks/2.2.1(default)           plink/1.07(default)
    edirect/1.50(default)              python/2.7/2.7.3
    emboss/6.6.0(default)              python/2.7/2.7.5
    fastqc/0.10.1(default)             python/2.7/2.7.6(default)
    flux/1.2.3                         python/2.7/2.7.6-sqlite
    flux/1.2.4(default)                python/3/3.3.4
    flux/1.2.4-SNAPSHOT                python-modules/2.6(default)
    flux/1.3                           rsem/1.1.17
    flux/1.4                           rsem/1.2.12(default)
    flux/1.5.1                         samtools/0.1.18
    flux/1.6                           samtools/0.1.19(default)
    flux/1.6.1                         shrimp/2.2.3(default)
    gemtools/1.6.1-i3                  sickle/1.210(default)
    gemtools/1.6.2-i3(default)         sratoolkit/2.3.5(default)
    gemtools/1.7.1-i3                  sublime-text/3-build-3059(default)
    gemtools/1.7-i3                    texlive/2012(default)
    glimmps                            ucsc/2013.02(default)
    htop/1.0.2(default)                vcftools/0.2.12a(default)

    ------------------------ /usr/share/Modules/modulefiles ------------------------
    dot         module-cvs  module-info modules     null        use.own

    ------------------------------- /etc/modulefiles -------------------------------
    compat-openmpi-x86_64 openmpi-x86_64


## Load/unload modules
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
# load default module version
$ module load samtools
load samtools/0.1.19 (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)
$ which samtools
/software/rg/el6.3/samtools-0.1.19/bin/samtools

# load specific version
$ module load samtools/0.1.18
load samtools/0.1.18 (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)
$ which samtools
/software/rg/el6.3/samtools-0.1.18/bin/samtools

# switch module version
$ module switch samtools samtools/0.1.19
switch1 samtools/0.1.18 (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)
...
$ which samtools
/software/rg/el6.3/samtools-0.1.19/bin/samtools
```


## Unload modules
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
# unload module
# equivalent to 'module unload samtools' but shorter!
$ module rm samtools
remove samtools/0.1.19 (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)

# unload all loaded modules
$ module purge
remove samtools/0.1.19 (PATH, MANPATH, LD_LIBRARY_PATH, C_INCLUDE_PATH)
remove bedtools/2.17.0 (PATH)
```


## List loaded modules
<!-- .element: style="margin-bottom: 0.6em;"-->

```bash
# list loaded modules
$ module list
Currently Loaded Modulefiles:
  1) samtools/0.1.19   2) bedtools/2.17.0
```
------

# Grape 2
<a href="//grape-pipeline.readthedocs.org"><h3><i class="fa fa-external-link-square"> grape-pipeline.readthedocs.org</i></h3></a>


## Current status
<!-- .element: style="margin-bottom: 0.6em;"-->

- Beta version released
- [Idxtools](#/2) metadata management
- [JIP](#/3) execution engine
- Embedded software management(grape-buildout)
- Pipeline steps:
    - mappings
    - transcript quantifications


## Work in progress
<!-- .element: style="margin-bottom: 0.6em;"-->

- [Nextflow](#/4) execution engine
- [Modules](#/5)/Docker software management
- modularity (e.g. start from BAM file)

<!-- ------

# SOLiD pipeline -->
